---
name: TaskFlow product boundary
description: Product scope and intended backend direction for TaskFlow.
---

TaskFlow's initial release is a frontend experience with demonstration login and browser-persisted data. The user intends to inspect and later adapt the source for a separate backend; production authentication, server persistence, and realtime collaboration are outside this MVP.

**Why:** The user explicitly scoped the first release to the frontend and described adapting it to a separate backend later.

**How to apply:** Keep future frontend changes portable and avoid adding production backend, authentication, or collaboration infrastructure unless the user requests that next stage.
