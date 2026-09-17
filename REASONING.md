# Reasoning

## 1. Problem Understanding

The project is a multi-level parking-garage attendant application. The main workflow is to check vehicles in, assign compatible parking spots, check them out, calculate the correct fee, and maintain a searchable parking log.

The specification requires:

- Tiered parking rates.
- The first hour has one price.
- Each additional hour is cheaper.
- Partial hours round up.
- A daily/24-hour cap prevents overcharging.
- Parking spots are limited and have types: compact, standard, and EV.
- EV vehicles must use EV spots.
- The attendant can check whether EV bays are available.
- Vehicles can be found by license plate.
- The application should work for configurable garages rather than one hard-coded garage.

The three additional graded twists are:

- **T4 — Messy data:** import a messy rate card per spot type, clean it, and use the cleaned values for pricing.
- **T2 — Automation:** `POST /clock` must automatically close and bill sessions parked for more than 24 hours.
- **T6 — Lifecycle:** transfer an open session to another plate while preserving its spot and entry time.

The implementation prioritizes the basic check-in/check-out and fee path first, followed by spot types/lookups and then the three twists.

## 2. Initial Implementation Decision

The original workspace did not have a usable application framework, so the implementation was designed as a self-contained browser application.

The client application contains:

- Configurable garage name, currency, rates, levels, and bay counts.
- Check-in, check-out, and plate-search tabs.
- Live parking-board occupancy.
- EV availability count.
- Persistent browser storage.
- Responsive styling.
- Light/dark theme support.

The parking model uses sessions containing the plate, vehicle type, bay, entry time, exit time, fee, and billed hours.

## 3. Spot Allocation Reasoning

Spot occupancy is derived from active sessions.

A spot is available when no open session currently references its ID.

Compatibility rules are:

- EV → EV only.
- Compact → compact first, then standard.
- Standard → standard only.

Available compatible bays are sorted so that a compact vehicle prefers a compact bay before using a standard bay.

Before creating a session, the selected bay is checked again. This prevents a stale UI selection from assigning a bay that was taken after the availability list was rendered.

The important invariant is:

> One open session occupies exactly one compatible bay, and an occupied bay belongs to at most one open session.

## 4. Fee Calculation

The fee calculation follows the required tiered structure.

For a billable duration of `h` hours:

```text
h = max(1, ceiling(elapsed_minutes / 60))

if h <= 1:
    fee = first-hour rate
else:
    fee = first-hour rate + (h - 1) × extra-hour rate
```

The resulting amount is capped according to the configured 24-hour/daily cap.

This explicitly handles partial hours by rounding them upward.

Examples:

- 30 minutes → 1 billed hour.
- 1 hour → 1 billed hour.
- 1 hour 1 minute → 2 billed hours.
- 2 hours 30 minutes → 3 billed hours.

The fee function was treated as a core path and validated before the additional twists were added.

## 5. T4 — Messy Rate Card

The browser-only application was insufficient for the required imported per-spot-type rate card and HTTP grading surface, so a small dependency-free Node service was added.

The rate import endpoint accepts noisy rate-card data and normalizes valid compact, standard, and EV rates while ignoring irrelevant/junk content.

The important data flow is:

```text
Raw/messy rate card
        ↓
Normalize and clean
        ↓
Validated per-type rates
        ↓
Fee calculation
```

A test initially exposed an important implementation gap: imported per-type rates were being stored, but billing still used the old global first-hour rate.

The fee path was then corrected so that a session's vehicle/spot type selects its corresponding cleaned rate.

This ensures imported values actually affect billing rather than merely being retained as configuration.

## 6. T2 — Automatic Closure Through `/clock`

The browser application itself had no HTTP server, so the `/clock` requirement could not be implemented reliably as UI-only behavior.

A Node service was added with:

```text
POST /clock
```

The clock operation checks open sessions and automatically closes sessions whose parking duration has exceeded 24 hours.

For an automatically closed session:

1. The session is identified as overdue.
2. The current clock time is used as the closing time.
3. The applicable cleaned per-type rate is used.
4. The fee is calculated.
5. The session is marked closed.
6. Its parking spot becomes available again.

Only open sessions are processed, making the operation effectively idempotent for already-closed sessions.

A deterministic test was used rather than waiting 24 real hours.

The final validation used a session that was exactly 24 hours and one minute old, which verifies the overdue boundary without introducing an unintended extra rounded hour.

## 7. T6 — Session Transfer

The valet hand-off is implemented as a mutation of an existing open session rather than creating a new session.

Before:

```text
Plate A → Spot L1-C03 → Entry T
```

After transfer:

```text
Plate B → Spot L1-C03 → Entry T
```

The spot and original entry timestamp remain unchanged.

This is important because creating a new session would reset the parking duration and could result in an incorrect fee.

Transfer validation ensures that the source session is open and that the new plate can be assigned according to the service rules.

## 8. API Surface

The backend introduced the following operations:

### Import rates

```text
POST /rates/import
```

Cleans the supplied rate-card data and stores per-type rates.

### Create/test a session

```text
POST /sessions
```

Creates a session for API-level lifecycle testing.

### Automatic clock processing

```text
POST /clock
```

Closes and bills overdue open sessions.

### Transfer a session

```text
POST /sessions/:id/transfer
```

Changes the plate while preserving the session's spot and entry time.

### Current state

```text
GET /api/state
```

Exposes the current backend state for verification.

## 9. Testing and Debugging

### Client syntax validation

The embedded JavaScript was extracted from the HTML and passed through the JavaScript parser.

The validation confirmed:

- The script exists.
- JavaScript syntax is valid.
- The fee round-up logic is present.
- EV allocation logic is present.

### Server syntax validation

The Node service was checked using:

```text
node --check server.js
```

The server passed syntax validation.

### HTTP smoke testing

The service was started on a temporary port and tested using real HTTP requests.

The flow covered:

```text
Import messy rates
        ↓
Create overdue session
        ↓
Transfer plate
        ↓
POST /clock
        ↓
Verify automatic billing
```

### Test-harness issue

An early assertion failed because the test command accidentally treated the `/api/state` response as if it were the rate-import response.

This was a test harness error rather than an application failure.

The assertion was corrected to preserve the actual rate-import response separately.

### Timing issue

Another test used a session approximately 25 hours old.

Because partial hours round up, the actual duration resulted in 26 billed hours and a higher calculated result than the test expected.

This correctly exposed the interaction between the 24-hour cap and partial-hour rounding.

The test was changed to use exactly 24 hours plus one minute, making the intended boundary deterministic.

The final integrated check then passed.

## 10. Final Verification

The final integration check verified all three twists together:

```text
Messy rate card
    ↓
Cleaned compact rate = 20

Open compact session
    ↓
Transfer plate
    ↓
Spot unchanged
    ↓
Entry time unchanged
    ↓
POST /clock
    ↓
Session automatically closed
    ↓
Correct fee calculated
```

The successful validation reported:

```text
rate import, transfer preservation, and /clock billing: OK
```

Additional final checks confirmed:

- Client JavaScript syntax is valid.
- Server JavaScript syntax is valid.
- The application can be served over HTTP.
- The documented API flow is reproducible.
- The repository does not need a framework or external dependency for the Node service.

## 11. Project Files

The intended project structure is:

```text
parking-garage/
├── index.html
├── server.js
├── package.json
├── README.md
└── REASONING.md
```

`index.html` is the browser entry point.

`server.js` provides the HTTP/API behavior required by the T4, T2, and T6 twists.

`package.json` provides the reproducible `npm start` command.

`README.md` documents setup and API usage.

`REASONING.md` records the implementation decisions, testing approach, discovered issues, and fixes.

## 12. Conclusion

The implementation was developed from the parking-garage storyline and then extended to satisfy the three graded twists.

The core parking lifecycle was established first, followed by compatibility and lookup behavior. The backend was then introduced because the `/clock` requirement requires an HTTP endpoint.

The final design keeps pricing data-driven, prevents an open session from sharing a spot with another open session, preserves parking history during valet transfers, and provides deterministic testing for the 24-hour automation behavior.
