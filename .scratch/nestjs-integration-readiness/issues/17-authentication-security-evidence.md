# Research mechanism-independent authentication security guarantees

Status: resolved
Type: research
Labels: wayfinder:research
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: Codex (authentication security research)
Blocked by: none

## Question

Which current primary-source security requirements and trade-offs should inform registration, sign-in, current authentication state, session lifecycle, sign-out and authenticated account context for a browser-facing private-workspace MVP, without selecting a credential strategy, JWT versus cookies, session storage, provider or deployment topology?

Cover trustworthy server-derived identity, invalidation/revocation and expiry, account enumeration, abuse resistance, transport and browser request protections conditional on the eventual mechanism, credential exposure and email-ownership implications. Distinguish baseline guarantees from mechanism-dependent controls and product scope choices. Do not infer email verification, MFA or a concrete authentication mechanism as approved requirements.

## Resolution requirements

AFK research only. Consult the research skill and current authoritative primary sources. Save cited findings as a linked research asset; record the answer here and resolve this research child when complete. The API Architecture Blueprint owner retains all human approval decisions. No application changes, implementation acceptance or dependency installation.

## Answer

Resolved on 2026-10-24 as external evidence only. [Authentication security evidence for the API Architecture Blueprint](../design/authentication-security-evidence.md) records current official OWASP and final NIST SP 800-63B-4 guidance, separates mechanism-independent guarantees from conditional browser controls, and identifies the human decisions still required on session lifetime/revocation/logout scope, registration and email ownership, abuse and safe errors.

Notably, browser cleanup alone does not establish revocation; token lifetime can differ from authentication freshness; registration responses can expose account existence even with generic errors; and OWASP recommends mailbox verification before account use, which must be presented as a product decision rather than silently approved. No authentication mechanism, provider, credential strategy, session store, MFA or email-verification requirement was selected. Existing account isolation, confirmed sign-out and uncertain-mutation requirements remain binding. The API Architecture Blueprint remains unresolved and human-owned.

Preflight recorded in the asset: source retrieval and local planning-document inspection only. No code, dependency, build, runtime test or implementation-acceptance claim.

### Evidence-only supplement — 2026-10-24

After reading the blueprint's approved Q6–Q8, supplemented the same [research asset](../design/authentication-security-evidence.md#supplement-pending-registration-and-verification-transitions) with primary-source evidence on malicious preregistration and owner/authentication-path binding, scanner/prefetch-safe verification, resend proof-invalidation trade-offs, SMTP delivery uncertainty and enumeration-safe public request behavior. Explicitly separated source statements from design implications. No new architecture approval, credential mechanism, resend policy or numeric limit was selected. Research remains resolved; pending transition decisions stay with the human-owned blueprint.
