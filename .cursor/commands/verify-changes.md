---
description: Production build plus IDE diagnostics after editing code — run before merging or closing a task
---

# Verify changes (quality gate)

Before you mark work complete:

1. Run **`npm run build`** (`ng build`; see `package.json` `scripts.build`).
2. If **`npm run lint`** or **`ng lint`** exists, run it after a successful build.
3. Open **Problems / Diagnostics** for files you touched; fix new errors attributable to your change.
4. If you changed behavior covered by tests, run **`npm run test`** and keep related tests passing.

Do not declare success until **`npm run build`** succeeds; otherwise fix failures or explain the specific blocker clearly.
