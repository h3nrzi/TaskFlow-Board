# TaskFlow progressive integration tickets

Status: approved breakdown published on 2026-10-25.

Source: [Approved specification](../nestjs-integration-readiness/spec.md). The original specification and completed readiness map are unchanged.

Each ticket is ready-for-agent subject to its blocking edges. Only ticket 01 is initially unblocked. Implementation has not started; publication is not capability activation or human implementation acceptance.

| Ticket | Blocked by |
| --- | --- |
| [01: Establish browser security context](issues/01-browser-security-context.md) | None |
| [02: Register a pending account and deliver verification mail](issues/02-pending-account-registration.md) | 01 |
| [03: Confirm mailbox ownership and enter restricted enrollment](issues/03-mailbox-confirmation.md) | 02 |
| [04: Complete owner-controlled enrollment](issues/04-owner-enrollment.md) | 03 |
| [05: Recover or leave pending enrollment](issues/05-pending-enrollment-recovery.md) | 04 |
| [06: Sign in, restore session state and sign out](issues/06-account-sessions.md) | 04 |
| [07: Handle foreground activity and session expiry](issues/07-session-activity-expiry.md) | 06 |
| [08: Enable Authentication with local Workspace](issues/08-activate-authentication.md) | 05, 07 |
| [09: View and edit the connected Profile](issues/09-connected-profile.md) | 08 |
| [10: Read a coherent private Workspace](issues/10-coherent-workspace-read.md) | 08 |
| [11: Create Projects with durable recovery](issues/11-project-creation.md) | 10 |
| [12: Create standalone Tasks with durable recovery](issues/12-standalone-task-creation.md) | 10 |
| [13: Edit Projects with revision protection](issues/13-project-editing.md) | 11 |
| [14: Edit and reassign Tasks](issues/14-task-editing-reassignment.md) | 11, 12 |
| [15: Delete Tasks safely](issues/15-task-deletion.md) | 12 |
| [16: Delete Projects with atomic task cascade](issues/16-project-cascade.md) | 13, 14, 15 |
| [17: Enable the complete connected Workspace](issues/17-activate-workspace.md) | 16 |
| [18: Verify the complete MVP contract and supported configurations](issues/18-mvp-contract-compatibility.md) | 09, 17 |

All slices include applicable contracts, API/persistence, UI, tests, source traceability and same-chat evaluation handoff. Tickets 08 and 17 establish supported capability activation; ticket 09 includes Profile activation. Earlier slices use explicit development/test configurations. Ticket 18 consolidates coverage without postponing requirements needed by earlier activation.

The approved dependency graph intentionally permits independent branches: enrollment recovery and sessions; connected Profile and Workspace; Project creation and standalone Task creation. A blocker means completed implementation with its required checks, not inferred human acceptance.

First implementation frontier: [01: Establish browser security context](issues/01-browser-security-context.md). Starting implementation remains a separate action.

## Publication verification

Passed: 18 numbered ticket files, all ready-for-agent; exact approved blocking edges; acyclic dependencies with blockers numbered first; 276 existing local link targets; whitespace/final-newline checks. All 34 source-readiness files remain byte-for-byte unchanged. No application tests or implementation work ran. Human implementation observations remain pending.
