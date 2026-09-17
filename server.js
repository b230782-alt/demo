const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 3000);
const sessions = new Map();
let rates = { firstHour: 60, extraHour: 40, dailyCap: 400 };

function json(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}
function readBody(request) {
  return new Promise((resolve, reject) => {
    let raw = '';
    request.on('data', chunk => { raw += chunk; });
    request.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(new Error('Request body must be valid JSON.')); }
    });
    request.on('error', reject);
  });
}
function normalizePlate(value) { return String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }
function numberFrom(value) {
  const match = String(value || '').replace(/,/g, '').match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}
function cleanRateCard(input) {
  const source = typeof input === 'string' ? input : JSON.stringify(input || '');
  const result = {};
  const aliases = [
    ['compact', /compact|small|car\s*[- ]?c/i],
    ['standard', /standard|regular|normal|car\s*[- ]?s/i],
    ['ev', /\bev\b|electric|charger/i]
  ];
  source.split(/[\n;,{}]+/).forEach(line => {
    const amount = numberFrom(line);
    if (amount === null) return;
    const match = aliases.find(([, pattern]) => pattern.test(line));
    if (match) result[match[0]] = amount;
  });
  if (!Object.keys(result).length) throw new Error('No compact, standard, or EV rates found.');
  return result;
}
function feeFor(start, end, type) {
  const hours = Math.max(1, Math.ceil(Math.max(0, end - start) / 3600000 - 1e-9));
  const days = Math.floor(hours / 24);
  const remainder = hours % 24;
  const firstHour = Number(rates[type]) || rates.firstHour;
  const extraHour = Number(rates[`${type}Extra`]) || rates.extraHour;
  const partial = remainder ? firstHour + (remainder - 1) * extraHour : 0;
  return { hours, fee: days * rates.dailyCap + Math.min(partial, rates.dailyCap) };
}
function activeSessionByPlate(plate) {
  return [...sessions.values()].find(session => !session.outAt && session.plate === plate);
}
function state() { return { rates, sessions: [...sessions.values()] }; }

async function handle(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  if (request.method === 'GET' && url.pathname === '/api/state') return json(response, 200, state());
  if (request.method === 'POST' && url.pathname === '/rates/import') {
    try {
      const body = await readBody(request);
      const cleaned = cleanRateCard(body.rateCard ?? body.rates ?? body);
      rates = { ...rates, ...(cleaned.compact != null ? { compact: cleaned.compact } : {}), ...(cleaned.standard != null ? { standard: cleaned.standard } : {}), ...(cleaned.ev != null ? { ev: cleaned.ev } : {}) };
      return json(response, 200, { rates, cleaned });
    } catch (error) { return json(response, 400, { error: error.message }); }
  }
  if (request.method === 'POST' && url.pathname === '/sessions') {
    try {
      const body = await readBody(request);
      const plate = normalizePlate(body.plate);
      if (!plate) return json(response, 400, { error: 'plate is required' });
      if (activeSessionByPlate(plate)) return json(response, 409, { error: 'plate is already parked' });
      const session = { id: body.id || `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, plate, spot: body.spot || body.bay || null, type: body.type || body.vtype || 'standard', inAt: Number(body.inAt || Date.now()), outAt: null, fee: 0 };
      sessions.set(session.id, session);
      return json(response, 201, session);
    } catch (error) { return json(response, 400, { error: error.message }); }
  }
  const transferMatch = url.pathname.match(/^\/sessions\/([^/]+)\/transfer$/);
  if (request.method === 'POST' && transferMatch) {
    try {
      const body = await readBody(request);
      const session = sessions.get(transferMatch[1]);
      const plate = normalizePlate(body.plate);
      if (!session || session.outAt) return json(response, 404, { error: 'open session not found' });
      if (!plate) return json(response, 400, { error: 'new plate is required' });
      if (activeSessionByPlate(plate) && activeSessionByPlate(plate).id !== session.id) return json(response, 409, { error: 'new plate is already parked' });
      session.plate = plate;
      return json(response, 200, session);
    } catch (error) { return json(response, 400, { error: error.message }); }
  }
  if (request.method === 'POST' && url.pathname === '/clock') {
    const now = Date.now();
    const closed = [];
    for (const session of sessions.values()) {
      if (!session.outAt && now - session.inAt > 24 * 3600000) {
        const quote = feeFor(session.inAt, now, session.type);
        session.outAt = now;
        session.fee = quote.fee;
        session.hours = quote.hours;
        session.closedBy = 'nightly-clock';
        closed.push(session);
      }
    }
    return json(response, 200, { closed, closedCount: closed.length, now });
  }
  if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
    const indexFile = path.join(__dirname, 'index.html');
    const file = fs.existsSync(indexFile) ? indexFile : path.join(__dirname, 'Readme.md');
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return response.end(fs.readFileSync(file));
  }
  return json(response, 404, { error: 'not found' });
}

http.createServer((request, response) => {
  handle(request, response).catch(error => {
    if (response.headersSent) return response.destroy();
    json(response, 500, { error: error.message });
  });
}).listen(PORT, () => console.log(`Garage API listening on http://localhost:${PORT}`));
