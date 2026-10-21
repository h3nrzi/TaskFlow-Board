# Baseline browser observations and limitations

2026-10-21, native Chrome 156.0.8078.48 arm64, macOS 26.1 build 25B78. A new incognito window isolated evaluation storage from the regular profile. Hosted `createBrowserTab('chrome', ...)` returned `Browser is not available: chrome`; native computer use was used instead. Personal storage was not read, copied or reset.

Original frontend ran with PORT=21998 BASE_PATH=/ after the committed native-exclusion accommodation. Dashboard loaded at http://localhost:21998/: Maya Chen, 3 seeded projects, 6 open tasks, 3 in progress, 2 completed, 25% progress. Coming-up dates were Oct 22–25. Navigation links: Overview, Projects, Tasks, Settings. Screenshot captured in the implementation conversation shows the desktop dashboard at 2880×1738 physical window pixels. The project creation form opened with name, description, initial, six color buttons, cancel and create controls. A later observation showed Settings with profile, Light/Dark and local storage explanation.

Evaluation was interrupted by concurrent changes to Chrome: computer-use returned `The user changed '/Applications/Google Chrome.app'. Re-query the latest state ...`; subsequent observation showed a different route than the form. Further interactive evaluation was paused to avoid interfering with the shared application. The attempted project form input is not evidence of successful creation.

Not measured: exact CSS viewport, device scale, browser timezone, frozen clock, document.fonts readiness, console/network trace. Date of execution and host timezone (Asia/Tehran) are known; browser timezone is unverified. No restorable localStorage snapshot was exported. No complete feature fixture, mobile comparison or browser equivalence claim can be made. The same-origin persistence, CRUD, filter, demo login, cascade and validation checks below remain pending. Incognito storage survives reload/server restart while the window remains open, but is discarded when all incognito windows close.

Observed pre-existing tooling defect: production build logs a tooltip.tsx sourcemap warning; build succeeds. No frontend behavior defect was established. Do not interpret untested behavior as defect-free.

The final production build reproduces the baseline's index-CkrM45mg.css (95.50 kB) and index-BZrco9Mm.js (376.63 kB), with the same 1766 transformed modules. This is supporting artifact evidence, not human/browser acceptance. Baseline and final build logs are committed.
