# 04: Harden discovery, navigation, and local profile workflows

**What to build:** Reliable coverage that users can find the intended work, navigate and recover without losing it, and retain their existing local profile and appearance choices.

**Blocked by:** 01 — Establish the journey audit matrix and execution baseline.

**Status:** ready-for-agent

- [x] Use the audit matrix to preserve useful tests and strengthen/add missing discovery, navigation, local profile, and appearance evidence.
- [x] Assert matching identities for supported search behavior, not counts alone. Exercise representative search/status/priority/project combinations and All projects versus No project membership, with meaningful empty-result behavior.
- [x] Assert meaningful ordered results for supported sorts, including relevant ties/undated placement where defined. Do not invent new ordering rules or precise same-day recency requirements.
- [x] Verify documented navigation state lifetimes: shell search retention and page-local filter/sort reset on remount. Assert observable results rather than internal state ownership.
- [x] Verify demo login and signup submission, existing validation behavior, and resulting local profile values rather than navigation alone. Preserve form draft/reset behavior where part of the existing contract; do not imply authentication, account isolation, or server validation.
- [x] Verify profile/theme saving and reload, visible profile personalization, and time-neutral Dashboard welcome. Preserve current theme initialization semantics.
- [x] Verify usable unknown-route and missing-project recovery actions and retention of work through navigation. Preserve existing keyboard recovery and established base-path behavior; avoid unneeded duplication of existing recovery checks.
- [x] Preserve keyboard and mobile access along these journeys, coordinating shared overlay/responsive reliability work with ticket 05.
- [x] Run focused verification and typechecking, update matrix references and evidence, complete required review, and prepare reproducible per-feature evaluation steps with actual preflight evidence and a concrete first action.
- [x] Preserve correct expectations for discovered product defects and explicitly record affected journeys as blocked. Do not modify product code or silently skip/relax coverage to pass.

## Implementation checkpoint

Focused checks and required two-axis review passed; all findings resolved at `57f5732`. See the phase audit/evaluation documents for actual command evidence, feature steps and limitations. Human observations pending; final three-run reliability belongs to ticket 06.
