# 04: Provide user-facing 404 recovery

**What to build:** Users encountering an unknown page receive understandable copy and a clear, keyboard-accessible link back to the Dashboard without losing their workspace.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [x] Replace developer-oriented missing-page copy with a user-facing explanation and a clearly labeled Dashboard recovery link.
- [x] The link reaches the Dashboard through established routing conventions and respects configured base-path behavior; do not redesign routing.
- [x] Saved workspace data survives unknown-route navigation and recovery. Preserve the separate missing-project fallback and established route/state behavior.
- [x] Follow existing styling/accessibility conventions; recovery remains readable and usable at narrow widths, in both themes, and by keyboard.
- [x] Browser verification covers unknown-route presentation, recovery activation and destination, workspace retention, and unchanged missing-project behavior through the approved seam and existing matrix.
- [x] Run focused checks and regular typechecking, complete Standards and Spec review, resolve actionable findings, and run the full repository check once at final integration after all ticket changes. Record real results, remaining limitations, and skips.
- [x] Prepare this ticket's reproducible evaluation guide, actual preflight evidence, and first user action. Preserve each earlier ticket's evaluation checkpoint; human acceptance remains pending until user observations. Commit completed work under the implement workflow.

## Comments

- User approved this ticket on 2026-10-23. Execute fourth in a fresh session; no technical blockers. Exact friendly wording and link placement are bounded implementation choices.

- Implemented and reviewed on 2026-10-23. Final `pnpm check` passed: 222 frontend passes, six intentional skips, dependency audit/typechecks/builds/API/tooling all passed. Evaluation guide preserves all four ticket checkpoints and pending human observations.
