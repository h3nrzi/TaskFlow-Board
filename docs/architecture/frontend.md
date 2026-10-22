# Frontend architecture

The frontend keeps its existing React state, routes, markup, local storage schema,
and demo workflows. These modules organize responsibility without introducing a
new state library or backend dependency.

| Module | Ownership |
| --- | --- |
| `apps/web/src/App.tsx` | Existing QueryClient, tooltip, router, error boundary and toaster composition. The outer route switch keeps the same paths and mounted shell lifetimes. |
| `apps/web/src/app/workspace-shell.tsx` | One workspace hook per mounted session, inner page routes, navigation, notices, search, mobile menu and overlay coordination. Validates form submissions and coordinates operations with feedback, navigation and closure. |
| `apps/web/src/app/navigation.tsx` | Desktop/mobile navigation and profile footer presentation. |
| `apps/web/src/features/overview/` | Dashboard and its local metric presentation. Reads domain selectors and shared task presentation. |
| `apps/web/src/features/projects/` | Project list, board and form. The form owns its draft and color choices; the board renders shared task presentation and domain selector results. |
| `apps/web/src/features/tasks/` | Task list and local filter/sort state, form drafts, task drawer, and shared status/priority/list-row presentation. Status labels, icons and CSS classes belong here. |
| `apps/web/src/features/settings/` | Profile draft and appearance controls; receives explicit profile/theme operations. |
| `apps/web/src/features/auth/` | Demo login/signup form state and validation feedback. |
| `apps/web/src/components/workspace/` | Shared empty state, deletion confirmation with focus integration, and display-date formatting. |
| `apps/web/src/workspace/use-workspace.ts` | Read snapshot, persistent workspace state and explicit task/project/profile/theme operations. The raw state setter stays private. Applies the existing theme effect and invokes persistence integration. |
| `apps/web/src/workspace/use-workspace-persistence.ts` | Save comparison/write protocol inside cross-tab locking, status, download actions and unload protection using the session read snapshot. |
| `apps/web/src/workspace/browser-storage.ts` | Browser reads/validation, recovery snapshot and exact-byte export. |
| Other `apps/web/src/workspace/` modules | Pure types, fixtures, local-calendar date helpers, validation, transitions and selectors. No React or browser dependencies. |

Dependencies flow from provider/router composition to shell and features, then to
workspace operations and pure rules. Features receive data and callbacks; they do
not import the shell or obtain a persistent state setter. Project/overview views
reuse task presentation directly, without a barrel or a reverse feature dependency.
Persistence imports domain types/validation/fixtures; domain modules import neither
persistence nor presentation.

State placement is part of the existing behavior. Search and overlay selections
stay in the shell. Filters, sorting and form drafts stay in their existing mounted
pages/forms. Login/signup retains the location key that resets its draft. A task
drawer resolves its selected task from current workspace data, falling back to the
original selection. Drawer, task form, project form, confirmation and notice keep
their original render order; inactive layers and the shell retain their existing
`inert` and focus handling.

Use the [per-ticket evaluation guide](../testing/frontend-architecture-evaluation.md)
for reproducible behavior checks and actual validation evidence. Human acceptance
remains pending until observations are reported.
