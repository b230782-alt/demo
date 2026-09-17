<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Garage booth</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Oswald:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#E3E4E0; --panel:#F5F5F2; --panel2:#ECEDE8; --ink:#171A1D; --muted:#5C636C;
  --line:#C7CAC3; --line2:#D9DBD5;
  --stripe:#E8A400; --free:#147346; --taken:#B03A24; --ev:#1F62D6;
  --freebg:#DFEDE4; --takenbg:#F2DED8; --evbg:#DEE6F7;
  --shadow:0 1px 0 rgba(0,0,0,.06);
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --bg:#17191C; --panel:#212428; --panel2:#1B1E21; --ink:#ECEEEA; --muted:#98A0A8;
    --line:#333940; --line2:#2A2F34;
    --stripe:#F2C13F; --free:#48C285; --taken:#EE7659; --ev:#77A9FF;
    --freebg:#1B2C24; --takenbg:#32211D; --evbg:#1C2634;
    --shadow:0 1px 0 rgba(0,0,0,.3);
  }
}
:root[data-theme="dark"]{
  --bg:#17191C; --panel:#212428; --panel2:#1B1E21; --ink:#ECEEEA; --muted:#98A0A8;
  --line:#333940; --line2:#2A2F34;
  --stripe:#F2C13F; --free:#48C285; --taken:#EE7659; --ev:#77A9FF;
  --freebg:#1B2C24; --takenbg:#32211D; --evbg:#1C2634;
  --shadow:0 1px 0 rgba(0,0,0,.3);
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{
  background:var(--bg); color:var(--ink);
  font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:15px; line-height:1.5; -webkit-font-smoothing:antialiased;
}
img{max-width:100%}
.sign{font-family:Oswald,"Arial Narrow",Inter,sans-serif;font-weight:500;letter-spacing:.02em}
.wrap{max-width:1180px;margin:0 auto;padding:18px 16px 64px}

/* ---------- header ---------- */
.top{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-end;justify-content:space-between;
  padding-bottom:14px;border-bottom:3px solid var(--stripe)}
.name{font-family:Oswald,sans-serif;font-weight:600;font-size:30px;line-height:1.05;margin:0}
.sub{color:var(--muted);font-size:13px;margin-top:2px}
.tally{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.pill{display:flex;align-items:baseline;gap:6px;background:var(--panel);border:1px solid var(--line);
  border-radius:3px;padding:6px 10px;box-shadow:var(--shadow)}
.pill b{font-family:Oswald,sans-serif;font-size:19px;font-weight:600}
.pill span{font-size:12px;color:var(--muted)}
.pill.ev b{color:var(--ev)}
button{font:inherit;color:inherit;cursor:pointer}
.btn{background:var(--panel);border:1px solid var(--line);border-radius:3px;padding:8px 13px;
  box-shadow:var(--shadow)}
.btn:hover{background:var(--panel2)}
.btn.primary{background:var(--stripe);border-color:var(--stripe);color:#22190A;font-weight:600}
.btn.primary:hover{filter:brightness(1.05)}
.btn.danger{color:var(--taken);border-color:var(--line)}
.theme-toggle{min-width:102px}
.btn:focus-visible,input:focus-visible,select:focus-visible,.bay:focus-visible,.tab:focus-visible{
  outline:2px solid var(--ev);outline-offset:2px}
.btn[disabled]{opacity:.5;cursor:not-allowed}

/* ---------- board ---------- */
.board{margin:22px 0 26px}
.level{margin-bottom:18px}
.level-head{display:flex;align-items:baseline;gap:12px;margin-bottom:8px}
.level-name{font-family:Oswald,sans-serif;font-size:17px;font-weight:600}
.level-free{font-size:13px;color:var(--muted)}
.bays{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:8px}
.bay{position:relative;text-align:left;background:var(--panel);border:1px solid var(--line);
  border-top:4px solid var(--stripe);border-radius:2px;padding:8px 9px 9px;display:block;min-height:74px;
  box-shadow:var(--shadow)}
.bay:hover{background:var(--panel2)}
.bay .bay-id{font-family:Oswald,sans-serif;font-size:15px;font-weight:600;display:block}
.bay .bay-kind{font-size:11.5px;color:var(--muted);display:block;margin-top:1px}
.bay .bay-plate{font-family:Oswald,sans-serif;font-size:14px;font-weight:500;display:block;margin-top:5px;
  word-break:break-all}
.bay .bay-since{font-size:11px;color:var(--muted);display:block}
.bay .dot{position:absolute;top:8px;right:8px;width:9px;height:9px;border-radius:50%;background:var(--free)}
.bay.taken{background:var(--takenbg)}
.bay.taken .dot{background:var(--taken)}
.bay.ev .bay-kind{color:var(--ev)}
.bay.ev{border-top-color:var(--ev)}
.bolt{width:9px;height:11px;vertical-align:-1px;margin-right:3px;fill:var(--ev)}

/* ---------- columns ---------- */
.cols{display:grid;grid-template-columns:minmax(0,380px) minmax(0,1fr);gap:20px;align-items:start}
@media (max-width:860px){.cols{grid-template-columns:1fr}}
.card{background:var(--panel);border:1px solid var(--line);border-radius:3px;box-shadow:var(--shadow)}
.tabs{display:flex;border-bottom:1px solid var(--line)}
.tab{flex:1;background:none;border:0;padding:11px 8px;font-size:14px;color:var(--muted);
  border-bottom:3px solid transparent;margin-bottom:-1px}
.tab[aria-selected="true"]{color:var(--ink);font-weight:600;border-bottom-color:var(--stripe)}
.pane{padding:16px}
.pane[hidden]{display:none}
label{display:block;font-size:12.5px;color:var(--muted);margin-bottom:4px}
input[type=text],input[type=number],input[type=datetime-local],select{
  width:100%;padding:9px 10px;background:var(--panel2);color:var(--ink);
  border:1px solid var(--line);border-radius:3px;font:inherit}
input[type=text].plate{font-family:Oswald,sans-serif;font-size:19px;letter-spacing:.08em;text-transform:uppercase}
.field{margin-bottom:13px}
.chips{display:flex;gap:6px}
.chip{flex:1;border:1px solid var(--line);background:var(--panel2);border-radius:3px;padding:9px 4px;
  text-align:center;font-size:13px}
.chip[aria-pressed="true"]{background:var(--ink);color:var(--panel);border-color:var(--ink);font-weight:600}
.chip.ev[aria-pressed="true"]{background:var(--ev);border-color:var(--ev);color:#fff}
.row{display:flex;gap:10px}
.row>*{flex:1;min-width:0}
.rules{font-size:12px;color:var(--muted);border-top:1px dashed var(--line);margin-top:14px;padding-top:10px}
.rules b{color:var(--ink);font-weight:600}
.note{font-size:12.5px;color:var(--muted);margin:-4px 0 12px}
.err{color:var(--taken);font-size:13px;margin-bottom:10px}

/* ---------- ticket ---------- */
.ticket{border:1px solid var(--line);border-left:4px solid var(--stripe);background:var(--panel2);
  border-radius:2px;padding:12px;margin-bottom:13px}
.ticket .tp{font-family:Oswald,sans-serif;font-size:20px;font-weight:600;letter-spacing:.06em}
.ticket .tm{font-size:12.5px;color:var(--muted);margin-top:2px}
.lines{margin:10px 0 0;font-size:13px}
.lines div{display:flex;justify-content:space-between;gap:10px;padding:2px 0}
.lines .cap{color:var(--taken)}
.total{display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid var(--line);
  margin-top:8px;padding-top:8px}
.total span{font-size:13px;color:var(--muted)}
.total b{font-family:Oswald,sans-serif;font-size:27px;font-weight:600}

/* ---------- log ---------- */
.log-head{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;
  padding:14px 16px;border-bottom:1px solid var(--line)}
.log-head h2{font-family:Oswald,sans-serif;font-size:18px;font-weight:600;margin:0}
.log-tools{display:flex;gap:8px;flex:1;justify-content:flex-end;min-width:200px}
.log-tools input{max-width:210px}
table{width:100%;border-collapse:collapse;font-size:13.5px}
.tblwrap{overflow-x:auto}
th{text-align:left;font-size:11.5px;font-weight:500;color:var(--muted);padding:8px 10px;
  border-bottom:1px solid var(--line);white-space:nowrap}
td{padding:9px 10px;border-bottom:1px solid var(--line2);white-space:nowrap}
tr:last-child td{border-bottom:0}
td.p{font-family:Oswald,sans-serif;font-size:15px;letter-spacing:.05em}
td.money{font-family:Oswald,sans-serif;font-size:15px;text-align:right}
.tag{font-size:11px;border:1px solid var(--line);border-radius:2px;padding:1px 5px;color:var(--muted)}
.tag.here{color:var(--free);border-color:var(--free);background:var(--freebg)}
.empty{padding:26px 16px;color:var(--muted);font-size:14px}
.more{padding:12px 16px;border-top:1px solid var(--line)}
.stats{display:flex;gap:18px;flex-wrap:wrap;padding:12px 16px;border-top:1px solid var(--line);font-size:13px;
  color:var(--muted)}
.stats b{font-family:Oswald,sans-serif;font-size:17px;color:var(--ink);font-weight:600;margin-right:4px}

/* ---------- setup dialog ---------- */
dialog{border:1px solid var(--line);border-radius:3px;background:var(--panel);color:var(--ink);
  padding:0;max-width:640px;width:calc(100% - 32px);box-shadow:0 12px 40px rgba(0,0,0,.28)}
dialog::backdrop{background:rgba(0,0,0,.45)}
.dlg-head{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;
  border-bottom:3px solid var(--stripe)}
.dlg-head h2{font-family:Oswald,sans-serif;font-size:20px;margin:0;font-weight:600}
.dlg-body{padding:16px;max-height:66vh;overflow:auto}
.dlg-foot{display:flex;justify-content:flex-end;gap:8px;padding:12px 16px;border-top:1px solid var(--line)}
.lvl-row{display:grid;grid-template-columns:1.4fr .7fr .7fr .7fr auto;gap:8px;align-items:end;margin-bottom:8px}
@media (max-width:560px){.lvl-row{grid-template-columns:1fr 1fr 1fr;}.lvl-row>:first-child{grid-column:1/-1}}
.sec{font-family:Oswald,sans-serif;font-size:15px;font-weight:600;margin:18px 0 8px}
.sec:first-child{margin-top:0}

/* ---------- toast ---------- */
#toast{position:fixed;left:50%;transform:translateX(-50%);bottom:22px;z-index:50;
  background:var(--ink);color:var(--bg);padding:10px 16px;border-radius:3px;font-size:14px;
  box-shadow:0 6px 24px rgba(0,0,0,.3);opacity:0;pointer-events:none;transition:opacity .18s}
#toast.show{opacity:1}
#toast.bad{background:var(--taken);color:#fff}
@media (prefers-reduced-motion: reduce){*{transition:none!important;animation:none!important}}
.foot{margin-top:26px;font-size:12px;color:var(--muted)}
</style>
</head>
<body>
<div class="wrap">

  <header class="top">
    <div>
      <h1 class="name" id="gname">City Centre Parking</h1>
      <div class="sub" id="gsub">Loading the board…</div>
    </div>
    <div class="tally">
      <div class="pill"><b id="tFree">–</b><span>free</span></div>
      <div class="pill"><b id="tTaken">–</b><span>parked</span></div>
      <div class="pill ev"><b id="tEv">–</b><span>EV bays free</span></div>
      <button class="btn theme-toggle" id="btnTheme" type="button" aria-pressed="false">Dark mode</button>
      <button class="btn" id="btnSetup">Set up garage</button>
    </div>
  </header>

  <section class="board" id="board"></section>

  <div class="cols">
    <!-- booth -->
    <section class="card">
      <div class="tabs" role="tablist">
        <button class="tab" role="tab" id="tab-in" aria-selected="true" aria-controls="pane-in">Check in</button>
        <button class="tab" role="tab" id="tab-out" aria-selected="false" aria-controls="pane-out">Check out</button>
        <button class="tab" role="tab" id="tab-find" aria-selected="false" aria-controls="pane-find">Find a plate</button>
      </div>

      <div class="pane" id="pane-in" role="tabpanel" aria-labelledby="tab-in">
        <div class="err" id="inErr" hidden></div>
        <div class="field">
          <label for="inPlate">Number plate</label>
          <input type="text" class="plate" id="inPlate" autocomplete="off" spellcheck="false" placeholder="RJ14 AB 1234">
        </div>
        <div class="field">
          <label>Vehicle</label>
          <div class="chips" id="inType">
            <button type="button" class="chip" data-t="compact" aria-pressed="false">Compact</button>
            <button type="button" class="chip" data-t="standard" aria-pressed="true">Standard</button>
            <button type="button" class="chip ev" data-t="ev" aria-pressed="false">Electric</button>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label for="inBay">Bay</label>
            <select id="inBay"></select>
          </div>
          <div class="field">
            <label for="inTime">Arrived</label>
            <input type="datetime-local" id="inTime">
          </div>
        </div>
        <button class="btn primary" id="btnIn" style="width:100%">Check in</button>
        <div class="rules" id="rulesIn"></div>
      </div>

      <div class="pane" id="pane-out" role="tabpanel" aria-labelledby="tab-out" hidden>
        <div class="err" id="outErr" hidden></div>
        <div class="field">
          <label for="outPlate">Number plate</label>
          <input type="text" class="plate" id="outPlate" autocomplete="off" spellcheck="false" placeholder="Type or tap a red bay">
        </div>
        <div id="outBody"></div>
      </div>

      <div class="pane" id="pane-find" role="tabpanel" aria-labelledby="tab-find" hidden>
        <div class="field">
          <label for="findQ">Plate, or part of one</label>
          <input type="text" class="plate" id="findQ" autocomplete="off" spellcheck="false" placeholder="AB12">
        </div>
        <div id="findBody"></div>
      </div>
    </section>

    <!-- log -->
    <section class="card">
      <div class="log-head">
        <h2>The day's log</h2>
        <div class="log-tools">
          <input type="text" id="logQ" placeholder="Search plate or bay" autocomplete="off">
          <select id="logScope" style="max-width:130px">
            <option value="today">Today</option>
            <option value="all">Everything</option>
            <option value="here">Still here</option>
          </select>
        </div>
      </div>
      <div class="tblwrap">
        <table>
          <thead><tr>
            <th>Plate</th><th>Bay</th><th>In</th><th>Out</th><th>Billed</th><th style="text-align:right">Fee</th><th></th>
          </tr></thead>
          <tbody id="logBody"></tbody>
        </table>
      </div>
      <div id="logEmpty" class="empty" hidden>Nothing here yet. Check a car in and it will show up.</div>
      <div class="more" id="logMore" hidden><button class="btn" id="btnMore">Show 25 more</button></div>
      <div class="stats" id="stats"></div>
    </section>
  </div>

  <p class="foot" id="foot"></p>
</div>

<dialog id="dlg">
  <form method="dialog">
    <div class="dlg-head"><h2>Set up the garage</h2><button class="btn" value="cancel">Close</button></div>
  </form>
  <div class="dlg-body">
    <div class="err" id="cfgErr" hidden></div>
    <div class="sec">The garage</div>
    <div class="row">
      <div class="field"><label for="cName">Name</label><input type="text" id="cName"></div>
      <div class="field" style="max-width:110px"><label for="cCur">Currency</label><input type="text" id="cCur"></div>
    </div>
    <div class="sec">Rates</div>
    <div class="row">
      <div class="field"><label for="cFirst">First hour</label><input type="number" id="cFirst" min="0" step="1"></div>
      <div class="field"><label for="cExtra">Each hour after</label><input type="number" id="cExtra" min="0" step="1"></div>
      <div class="field"><label for="cCap">Cap per 24 hours</label><input type="number" id="cCap" min="0" step="1"></div>
    </div>
    <p class="note">Part-hours round up to the next full hour, and a stay is never charged less than one hour. Once a stay passes the cap, it costs the cap for that day and the clock starts again.</p>
    <div class="sec">Levels and bays</div>
    <div id="cLevels"></div>
    <button class="btn" id="btnAddLevel" type="button">Add a level</button>
  </div>
  <div class="dlg-foot">
    <button class="btn" id="btnCfgCancel" type="button">Cancel</button>
    <button class="btn primary" id="btnCfgSave" type="button">Save changes</button>
  </div>
</dialog>

<div id="toast" role="status" aria-live="polite"></div>

<script>
"use strict";
/* ============================ model ============================ */
var TYPES = {compact:"Compact", standard:"Standard", ev:"EV bay"};
var CODE = {compact:"C", standard:"S", ev:"E"};
var DEFAULT_CONFIG = {
  name:"City Centre Parking", currency:"\u20B9",
  firstHour:60, extraHour:40, dailyCap:400,
  levels:[
    {name:"Level 1", compact:6, standard:10, ev:3},
    {name:"Level 2", compact:6, standard:12, ev:2},
    {name:"Level 3", compact:4, standard:8,  ev:0}
  ]
};

var config = clone(DEFAULT_CONFIG);
var sessions = [];           // {id, plate, vtype, bay, inAt, outAt, fee, hours}
var draftType = "standard";
var logPage = 25;
var db = null, downloads = null, storeMode = "local";

function clone(o){ return JSON.parse(JSON.stringify(o)); }
function normPlate(s){ return String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,""); }
function money(n){ return config.currency + Number(n||0).toFixed(2).replace(/\.00$/,""); }
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

function allBays(){
  var out = [];
  config.levels.forEach(function(lv, i){
    ["compact","standard","ev"].forEach(function(t){
      var n = Math.max(0, parseInt(lv[t],10) || 0);
      for(var k=1;k<=n;k++){
        out.push({ id:"L"+(i+1)+"-"+CODE[t]+String(k).padStart(2,"0"), type:t, level:i, levelName:lv.name||("Level "+(i+1)) });
      }
    });
  });
  return out;
}
function active(){ return sessions.filter(function(s){ return !s.outAt; }); }
function occupancy(){ var m={}; active().forEach(function(s){ m[s.bay]=s; }); return m; }
function fits(vtype, bayType){
  if(vtype==="ev") return bayType==="ev";
  if(vtype==="compact") return bayType==="compact" || bayType==="standard";
  return bayType==="standard";
}
function eligibleFree(vtype){
  var occ = occupancy();
  var free = allBays().filter(function(b){ return !occ[b.id] && fits(vtype, b.type); });
  var pref = vtype==="compact" ? ["compact","standard"] : [vtype];
  free.sort(function(a,b){
    var d = pref.indexOf(a.type) - pref.indexOf(b.type);
    return d !== 0 ? d : (a.id < b.id ? -1 : 1);
  });
  return free;
}

/* fee: first hour, cheaper hours after, capped per 24h, part-hours round up */
function quote(inAt, outAt){
  var mins = Math.max(0, (outAt - inAt) / 60000);
  var hours = Math.max(1, Math.ceil(mins / 60 - 1e-9));
  var cap = Number(config.dailyCap) || 0;
  var first = Number(config.firstHour) || 0;
  var extra = Number(config.extraHour) || 0;
  var days = Math.floor(hours / 24), rem = hours % 24;
  var raw = rem === 0 ? 0 : first + (rem - 1) * extra;
  var part = cap > 0 ? Math.min(raw, cap) : raw;
  var lines = [];
  if(days > 0) lines.push([days + (days>1?" full days at the cap":" full day at the cap"), days * cap]);
  if(rem > 0){
    lines.push(["First hour", first]);
    if(rem > 1) lines.push([(rem-1) + (rem-1>1 ? " more hours" : " more hour") + " at " + money(extra), (rem-1)*extra]);
    if(cap > 0 && raw > cap) lines.push(["Capped at " + money(cap) + " for the day", null]);
  }
  return { mins:mins, hours:hours, days:days, rem:rem, total:days*cap + part, lines:lines, capped:(cap>0 && raw>cap) };
}

function dur(ms){
  var m = Math.max(0, Math.round(ms/60000));
  var h = Math.floor(m/60);
  return (h ? h + "h " : "") + (m%60) + "m";
}
function clockOf(ms){
  return new Date(ms).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
}
function stampOf(ms){
  var d = new Date(ms), now = new Date();
  var sameDay = d.toDateString() === now.toDateString();
  return sameDay ? clockOf(ms) : d.toLocaleDateString([], {day:"2-digit", month:"short"}) + " " + clockOf(ms);
}
function toLocalInput(ms){
  var d = new Date(ms - new Date().getTimezoneOffset()*60000);
  return d.toISOString().slice(0,16);
}
function fromLocalInput(v){ var t = new Date(v).getTime(); return isNaN(t) ? null : t; }
function startOfToday(){ var d = new Date(); d.setHours(0,0,0,0); return d.getTime(); }

/* ============================ storage ============================ */
var LS_S = "garage.sessions.v1", LS_C = "garage.config.v1";
function loadLocal(){
  try{
    var c = localStorage.getItem(LS_C); if(c) config = Object.assign(clone(DEFAULT_CONFIG), JSON.parse(c));
    var s = localStorage.getItem(LS_S); if(s) sessions = JSON.parse(s) || [];
  }catch(e){}
}
function saveLocal(){
  try{
    localStorage.setItem(LS_C, JSON.stringify(config));
    localStorage.setItem(LS_S, JSON.stringify(sessions));
  }catch(e){}
}
function putSession(s){
  var i = sessions.findIndex(function(x){ return x.id === s.id; });
  if(i >= 0) sessions[i] = s; else sessions.push(s);
  if(storeMode === "db"){
    var body = Object.assign({}, s); delete body.id;
    db.doc("sessions/" + s.id).set(body).catch(function(e){ toast("Could not save: " + e.code, true); });
  } else saveLocal();
  render();
}
function dropSession(id){
  sessions = sessions.filter(function(x){ return x.id !== id; });
  if(storeMode === "db") db.doc("sessions/" + id).delete().catch(function(){});
  else saveLocal();
  render();
}
function saveConfig(){
  if(storeMode === "db") db.doc("meta/config").set(clone(config)).catch(function(e){ toast("Could not save: " + e.code, true); });
  else saveLocal();
  render();
}

(async function boot(){
  loadLocal();
  render();
  var c = (typeof window !== "undefined" && window.claude && window.claude.use) ? window.claude : null;
  if(!c) { setSub(); return; }
  try{ downloads = await c.use("downloads"); }catch(e){}
  var d = null;
  try{ d = await c.use("db"); }catch(e){}
  if(!d){ setSub(); addExport(); return; }
  db = d; storeMode = "db";
  try{
    var snap = await db.doc("meta/config").get();
    if(snap.exists) config = Object.assign(clone(DEFAULT_CONFIG), snap.data());
    else {
      await db.doc("meta/config").set(clone(config));            // first run: seed
      for(var i=0;i<sessions.length;i++){                         // carry over anything logged before
        var b = Object.assign({}, sessions[i]); var id = b.id; delete b.id;
        await db.doc("sessions/" + id).set(b);
      }
    }
  }catch(e){}
  db.doc("meta/config").onSnapshot(function(s){
    if(s.exists){ config = Object.assign(clone(DEFAULT_CONFIG), s.data()); render(); }
  }, function(){});
  db.collection("sessions").onSnapshot(function(s){
    sessions = s.docs.map(function(d){ return Object.assign({id:d.id}, d.data()); });
    render();
  }, function(e){ toast("Live log stopped: " + e.code, true); });
  setSub(); addExport();
})();

function setSub(){
  var el = document.getElementById("foot");
  el.textContent = storeMode === "db"
    ? "The log is saved with this page, so it is still here tomorrow and on any device you open it from."
    : "This copy keeps the log in this browser only. Published, it saves with the page instead.";
}
function addExport(){
  if(!downloads) return;
  var b = document.createElement("button");
  b.className = "btn"; b.textContent = "Export the log";
  b.onclick = function(){
    var rows = [["Plate","Vehicle","Bay","In","Out","Hours billed","Fee"]].concat(
      visibleLog(true).map(function(s){
        return [s.plate, TYPES[s.vtype], s.bay, new Date(s.inAt).toISOString(),
                s.outAt ? new Date(s.outAt).toISOString() : "", s.hours || "", s.outAt ? s.fee : ""];
      }));
    var csv = rows.map(function(r){ return r.map(function(c){ return '"' + String(c).replace(/"/g,'""') + '"'; }).join(","); }).join("\n");
    downloads.save({ filename: "parking-log.csv", data: csv }).catch(function(){});
  };
  document.querySelector(".log-tools").appendChild(b);
}

/* ============================ render ============================ */
function render(){
  var occ = occupancy(), bays = allBays();
  document.getElementById("gname").textContent = config.name || "Parking";
  document.getElementById("gsub").textContent =
    money(config.firstHour) + " first hour, " + money(config.extraHour) + " each hour after, " +
    money(config.dailyCap) + " a day at most.";
  var taken = Object.keys(occ).length;
  document.getElementById("tFree").textContent = bays.length - taken;
  document.getElementById("tTaken").textContent = taken;
  document.getElementById("tEv").textContent = bays.filter(function(b){ return b.type==="ev" && !occ[b.id]; }).length;

  renderBoard(bays, occ);
  renderRules();
  refreshBaySelect();
  renderOut();
  renderFind();
  renderLog();
}

function renderBoard(bays, occ){
  var wrap = document.getElementById("board");
  if(!bays.length){ wrap.innerHTML = '<div class="empty card">No bays yet. Open “Set up garage” and tell it what this garage has.</div>'; return; }
  var now = Date.now(), html = "";
  config.levels.forEach(function(lv, i){
    var mine = bays.filter(function(b){ return b.level === i; });
    if(!mine.length) return;
    var free = mine.filter(function(b){ return !occ[b.id]; }).length;
    html += '<div class="level"><div class="level-head"><div class="level-name">' + esc(lv.name || ("Level "+(i+1))) +
            '</div><div class="level-free">' + free + " of " + mine.length + ' free</div></div><div class="bays">';
    mine.forEach(function(b){
      var s = occ[b.id];
      html += '<button class="bay ' + (s ? "taken " : "") + (b.type==="ev" ? "ev" : "") + '" data-bay="' + b.id + '" data-plate="' + (s ? esc(s.plate) : "") + '">' +
        '<span class="dot"></span>' +
        '<span class="bay-id">' + b.id + '</span>' +
        '<span class="bay-kind">' + (b.type==="ev" ? '<svg class="bolt" viewBox="0 0 8 12"><path d="M5 0 0 7h3l-1 5 5-7H4z"/></svg>' : "") + TYPES[b.type] + '</span>' +
        (s ? '<span class="bay-plate">' + esc(s.plate) + '</span><span class="bay-since">' + dur(now - s.inAt) + " so far</span>" : "") +
        '</button>';
    });
    html += "</div></div>";
  });
  wrap.innerHTML = html;
}

function renderRules(){
  document.getElementById("rulesIn").innerHTML =
    "<b>How bays are picked.</b> An electric car only ever gets an EV bay. A compact car takes a compact bay first and a standard one if none are left. A standard car needs a standard bay. Pick a different bay above whenever you need to.";
}

function refreshBaySelect(){
  var sel = document.getElementById("inBay"), keep = sel.value;
  var free = eligibleFree(draftType);
  sel.innerHTML = free.length
    ? free.map(function(b, i){
        return '<option value="' + b.id + '">' + b.id + " \u00b7 " + TYPES[b.type] + " \u00b7 " + esc(b.levelName) + (i===0 ? " (next up)" : "") + "</option>";
      }).join("")
    : '<option value="">No bay free for this vehicle</option>';
  if(keep && free.some(function(b){ return b.id === keep; })) sel.value = keep;
  document.getElementById("btnIn").disabled = !free.length;
}

/* ---- check out ---- */
function renderOut(){
  var q = normPlate(document.getElementById("outPlate").value);
  var box = document.getElementById("outBody");
  if(!q){ box.innerHTML = '<p class="note">Type a plate, or tap the car on the board above.</p>'; return; }
  var hits = active().filter(function(s){ return s.plate.indexOf(q) >= 0; });
  if(!hits.length){
    var gone = sessions.filter(function(s){ return s.outAt && s.plate.indexOf(q) >= 0; })
                       .sort(function(a,b){ return b.outAt - a.outAt; })[0];
    box.innerHTML = gone
      ? '<p class="note">No car parked under that plate. ' + esc(gone.plate) + " left at " + stampOf(gone.outAt) + " and paid " + money(gone.fee) + ".</p>"
      : '<p class="note">No car parked under that plate.</p>';
    return;
  }
  if(hits.length > 1){
    box.innerHTML = '<p class="note">' + hits.length + ' cars match. Pick one:</p>' + hits.map(function(s){
      return '<button class="btn" style="width:100%;text-align:left;margin-bottom:6px" data-pick="' + esc(s.plate) + '">' +
             '<span class="sign">' + esc(s.plate) + "</span> \u00b7 " + s.bay + " \u00b7 in at " + stampOf(s.inAt) + "</button>";
    }).join("");
    return;
  }
  var s = hits[0];
  var leaveEl = document.getElementById("outTime");
  var leaveAt = leaveEl ? fromLocalInput(leaveEl.value) : null;
  if(!leaveAt || !leaveEl) leaveAt = Date.now();
  var q2 = quote(s.inAt, Math.max(leaveAt, s.inAt));
  box.innerHTML =
    '<div class="ticket">' +
      '<div class="tp">' + esc(s.plate) + '</div>' +
      '<div class="tm">' + TYPES[s.vtype] + " in " + s.bay + " \u00b7 arrived " + stampOf(s.inAt) + " \u00b7 " + dur(Math.max(0, leaveAt - s.inAt)) + " so far</div>" +
      '<div class="lines">' + q2.lines.map(function(l){
          return '<div class="' + (l[1]===null ? "cap" : "") + '"><span>' + esc(l[0]) + "</span><span>" + (l[1]===null ? "" : money(l[1])) + "</span></div>";
        }).join("") +
      '<div><span>' + q2.hours + (q2.hours>1 ? " hours billed" : " hour billed") + " (part-hours round up)</span><span></span></div></div>" +
      '<div class="total"><span>To pay</span><b>' + money(q2.total) + "</b></div>" +
    "</div>" +
    '<div class="field"><label for="outTime">Leaving</label><input type="datetime-local" id="outTime" value="' + toLocalInput(leaveAt) + '"></div>' +
    '<button class="btn primary" id="btnOut" style="width:100%" data-id="' + s.id + '">Check out and charge ' + money(q2.total) + "</button>" +
    '<button class="btn danger" id="btnVoid" style="width:100%;margin-top:8px" data-id="' + s.id + '">Cancel this check-in</button>';
}

/* ---- find ---- */
function renderFind(){
  var q = normPlate(document.getElementById("findQ").value);
  var box = document.getElementById("findBody");
  if(!q){ box.innerHTML = '<p class="note">Searches cars parked now and everything already checked out.</p>'; return; }
  var hits = sessions.filter(function(s){ return s.plate.indexOf(q) >= 0; })
                     .sort(function(a,b){ return (b.outAt||Infinity) === (a.outAt||Infinity) ? b.inAt - a.inAt : (a.outAt ? 1 : -1); })
                     .slice(0, 30);
  if(!hits.length){ box.innerHTML = '<p class="note">Nothing matches ' + esc(q) + ".</p>"; return; }
  box.innerHTML = hits.map(function(s){
    return '<div class="ticket" style="border-left-color:' + (s.outAt ? "var(--line)" : "var(--free)") + '">' +
      '<div class="tp">' + esc(s.plate) + '</div>' +
      '<div class="tm">' + (s.outAt
        ? "Left " + stampOf(s.outAt) + " \u00b7 stayed " + dur(s.outAt - s.inAt) + " \u00b7 paid " + money(s.fee)
        : "Parked in " + s.bay + " since " + stampOf(s.inAt) + " \u00b7 " + dur(Date.now() - s.inAt)) + "</div>" +
    "</div>";
  }).join("");
}

/* ---- log ---- */
function visibleLog(forExport){
  var q = normPlate(document.getElementById("logQ").value);
  var qraw = document.getElementById("logQ").value.trim().toUpperCase();
  var scope = document.getElementById("logScope").value;
  var t0 = startOfToday();
  return sessions.filter(function(s){
    if(scope === "here" && s.outAt) return false;
    if(scope === "today" && !(s.inAt >= t0 || (s.outAt && s.outAt >= t0) || !s.outAt)) return false;
    if(q && s.plate.indexOf(q) < 0 && s.bay.toUpperCase().indexOf(qraw) < 0) return false;
    return true;
  }).sort(function(a,b){ return (b.outAt || b.inAt) - (a.outAt || a.inAt); });
}
function renderLog(){
  var rows = visibleLog();
  var shown = rows.slice(0, logPage);
  document.getElementById("logBody").innerHTML = shown.map(function(s){
    return "<tr>" +
      '<td class="p">' + esc(s.plate) + "</td>" +
      "<td>" + s.bay + "</td>" +
      "<td>" + stampOf(s.inAt) + "</td>" +
      "<td>" + (s.outAt ? stampOf(s.outAt) : '<span class="tag here">here now</span>') + "</td>" +
      "<td>" + (s.outAt ? s.hours + "h" : dur(Date.now() - s.inAt)) + "</td>" +
      '<td class="money">' + (s.outAt ? money(s.fee) : "\u2014") + "</td>" +
      "<td>" + (s.outAt ? "" : '<button class="btn" data-out="' + esc(s.plate) + '" style="padding:3px 8px;font-size:12px">Check out</button>') + "</td>" +
    "</tr>";
  }).join("");
  document.getElementById("logEmpty").hidden = rows.length > 0;
  document.getElementById("logMore").hidden = rows.length <= shown.length;

  var t0 = startOfToday();
  var closedToday = sessions.filter(function(s){ return s.outAt && s.outAt >= t0; });
  var inToday = sessions.filter(function(s){ return s.inAt >= t0; });
  document.getElementById("stats").innerHTML =
    "<div><b>" + inToday.length + "</b>checked in today</div>" +
    "<div><b>" + closedToday.length + "</b>checked out today</div>" +
    "<div><b>" + money(closedToday.reduce(function(a,s){ return a + (s.fee||0); }, 0)) + "</b>taken today</div>" +
    "<div><b>" + active().length + "</b>parked right now</div>";
}

/* ============================ actions ============================ */
function toast(msg, bad){
  var t = document.getElementById("toast");
  t.textContent = msg; t.className = "show" + (bad ? " bad" : "");
  clearTimeout(t._t); t._t = setTimeout(function(){ t.className = ""; }, 3200);
}
function showErr(id, msg){
  var el = document.getElementById(id);
  if(!msg){ el.hidden = true; el.textContent = ""; return; }
  el.hidden = false; el.textContent = msg;
}
function tab(which){
  ["in","out","find"].forEach(function(k){
    document.getElementById("tab-" + k).setAttribute("aria-selected", String(k === which));
    document.getElementById("pane-" + k).hidden = (k !== which);
  });
}
document.getElementById("tab-in").onclick = function(){ tab("in"); };
document.getElementById("tab-out").onclick = function(){ tab("out"); };
document.getElementById("tab-find").onclick = function(){ tab("find"); };

document.getElementById("inType").addEventListener("click", function(e){
  var b = e.target.closest(".chip"); if(!b) return;
  draftType = b.dataset.t;
  [].forEach.call(this.querySelectorAll(".chip"), function(c){ c.setAttribute("aria-pressed", String(c === b)); });
  refreshBaySelect();
  showErr("inErr", "");
});
document.getElementById("inTime").value = toLocalInput(Date.now());

document.getElementById("btnIn").onclick = function(){
  var plate = normPlate(document.getElementById("inPlate").value);
  var bay = document.getElementById("inBay").value;
  var at = fromLocalInput(document.getElementById("inTime").value) || Date.now();
  if(plate.length < 2) return showErr("inErr", "That plate looks too short. Type the plate as it reads on the car.");
  var already = active().filter(function(s){ return s.plate === plate; })[0];
  if(already) return showErr("inErr", plate + " is already parked in " + already.bay + ". Check it out first.");
  if(!bay) return showErr("inErr", "No bay is free for a " + TYPES[draftType].toLowerCase() + " right now.");
  if(occupancy()[bay]) { refreshBaySelect(); return showErr("inErr", bay + " was just taken. Pick another bay."); }
  showErr("inErr", "");
  putSession({ id:"s" + Date.now().toString(36) + Math.random().toString(36).slice(2,7),
               plate:plate, vtype:draftType, bay:bay, inAt:at, outAt:null, fee:0, hours:0 });
  document.getElementById("inPlate").value = "";
  document.getElementById("inTime").value = toLocalInput(Date.now());
  toast(plate + " parked in " + bay);
};

document.getElementById("inPlate").addEventListener("input", function(){ showErr("inErr", ""); });
document.getElementById("outPlate").addEventListener("input", renderOut);
document.getElementById("findQ").addEventListener("input", renderFind);
document.getElementById("logQ").addEventListener("input", function(){ logPage = 25; renderLog(); });
document.getElementById("logScope").addEventListener("change", function(){ logPage = 25; renderLog(); });
document.getElementById("btnMore").onclick = function(){ logPage += 25; renderLog(); };

document.getElementById("outBody").addEventListener("input", function(e){
  if(e.target.id === "outTime") renderOut();
});
document.getElementById("outBody").addEventListener("click", function(e){
  var pick = e.target.closest("[data-pick]");
  if(pick){ document.getElementById("outPlate").value = pick.dataset.pick; renderOut(); return; }
  var out = e.target.closest("#btnOut");
  if(out){
    var s = sessions.filter(function(x){ return x.id === out.dataset.id; })[0];
    if(!s || s.outAt) return;
    var leave = fromLocalInput(document.getElementById("outTime").value) || Date.now();
    if(leave < s.inAt) return showErr("outErr", "That is before the car arrived. Check the leaving time.");
    showErr("outErr", "");
    var q = quote(s.inAt, leave);
    putSession(Object.assign({}, s, { outAt:leave, fee:q.total, hours:q.hours }));
    document.getElementById("outPlate").value = "";
    renderOut();
    toast(s.plate + " out of " + s.bay + " \u00b7 charge " + money(q.total));
    return;
  }
  var v = e.target.closest("#btnVoid");
  if(v){
    var sv = sessions.filter(function(x){ return x.id === v.dataset.id; })[0];
    if(!sv) return;
    dropSession(sv.id);
    document.getElementById("outPlate").value = "";
    toast(sv.plate + " removed. " + sv.bay + " is free again.");
  }
});

document.getElementById("board").addEventListener("click", function(e){
  var b = e.target.closest(".bay"); if(!b) return;
  if(b.dataset.plate){
    tab("out");
    document.getElementById("outPlate").value = b.dataset.plate;
    renderOut();
    document.getElementById("outPlate").scrollIntoView({block:"center"});
  } else {
    tab("in");
    var sel = document.getElementById("inBay");
    if([].some.call(sel.options, function(o){ return o.value === b.dataset.bay; })){
      sel.value = b.dataset.bay;
      document.getElementById("inPlate").focus();
    } else {
      toast("A " + TYPES[draftType].toLowerCase() + " cannot use " + b.dataset.bay + ". Change the vehicle first.", true);
    }
  }
});
document.getElementById("logBody").addEventListener("click", function(e){
  var b = e.target.closest("[data-out]"); if(!b) return;
  tab("out");
  document.getElementById("outPlate").value = b.dataset.out;
  renderOut();
  document.querySelector(".cols").scrollIntoView({block:"start"});
});

/* ---- appearance ---- */
var themeButton = document.getElementById("btnTheme");
function applyTheme(theme){
  var dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeButton.textContent = dark ? "Light mode" : "Dark mode";
  themeButton.setAttribute("aria-pressed", String(dark));
  themeButton.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}
var savedTheme = localStorage.getItem("garage.theme.v1");
applyTheme(savedTheme || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeButton.onclick = function(){
  var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("garage.theme.v1", next);
  applyTheme(next);
};

/* ---- setup ---- */
var dlg = document.getElementById("dlg"), draftCfg = null;
document.getElementById("btnSetup").onclick = function(){
  draftCfg = clone(config);
  document.getElementById("cName").value = draftCfg.name;
  document.getElementById("cCur").value = draftCfg.currency;
  document.getElementById("cFirst").value = draftCfg.firstHour;
  document.getElementById("cExtra").value = draftCfg.extraHour;
  document.getElementById("cCap").value = draftCfg.dailyCap;
  drawLevels();
  showErr("cfgErr", "");
  dlg.showModal();
};
function drawLevels(){
  var occ = occupancy();
  var used = {};
  allBays().forEach(function(b){ if(occ[b.id]){ used[b.level] = used[b.level] || {}; used[b.level][b.type] = (used[b.level][b.type]||0) + 1; } });
  document.getElementById("cLevels").innerHTML = draftCfg.levels.map(function(lv, i){
    return '<div class="lvl-row" data-i="' + i + '">' +
      '<div><label>Level name</label><input type="text" data-f="name" value="' + esc(lv.name||"") + '"></div>' +
      ["compact","standard","ev"].map(function(t){
        var u = (used[i] && used[i][t]) || 0;
        return '<div><label>' + TYPES[t] + (u ? " (" + u + " in use)" : "") + '</label><input type="number" min="' + u + '" data-f="' + t + '" value="' + (lv[t]||0) + '"></div>';
      }).join("") +
      '<div><button class="btn danger" data-del="' + i + '" type="button">Remove</button></div>' +
    "</div>";
  }).join("");
}
document.getElementById("cLevels").addEventListener("input", function(e){
  var row = e.target.closest(".lvl-row"); if(!row) return;
  var i = +row.dataset.i, f = e.target.dataset.f;
  draftCfg.levels[i][f] = f === "name" ? e.target.value : Math.max(0, parseInt(e.target.value,10) || 0);
});
document.getElementById("cLevels").addEventListener("click", function(e){
  var d = e.target.closest("[data-del]"); if(!d) return;
  draftCfg.levels.splice(+d.dataset.del, 1); drawLevels();
});
document.getElementById("btnAddLevel").onclick = function(){
  draftCfg.levels.push({ name:"Level " + (draftCfg.levels.length + 1), compact:4, standard:8, ev:2 });
  drawLevels();
};
document.getElementById("btnCfgCancel").onclick = function(){ dlg.close(); };
document.getElementById("btnCfgSave").onclick = function(){
  draftCfg.name = document.getElementById("cName").value.trim() || "Parking";
  draftCfg.currency = document.getElementById("cCur").value.trim() || "\u20B9";
  draftCfg.firstHour = Math.max(0, +document.getElementById("cFirst").value || 0);
  draftCfg.extraHour = Math.max(0, +document.getElementById("cExtra").value || 0);
  draftCfg.dailyCap = Math.max(0, +document.getElementById("cCap").value || 0);
  var was = config; config = draftCfg;
  var ids = {}; allBays().forEach(function(b){ ids[b.id] = 1; });
  var orphan = active().filter(function(s){ return !ids[s.bay]; });
  if(orphan.length){
    config = was;
    showErr("cfgErr", orphan.map(function(s){ return s.plate + " in " + s.bay; }).join(", ") +
      (orphan.length > 1 ? " are parked in bays" : " is parked in a bay") + " you are removing. Check them out first, or keep those bays.");
    return;
  }
  saveConfig();
  dlg.close();
  toast("Garage saved");
};

setInterval(function(){ renderBoard(allBays(), occupancy()); renderLog(); }, 60000);
</script>
</body>
</html>