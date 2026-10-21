# Domain docs

This repo uses a single-context layout across its workspace packages:

- `GLOSSARY.md` at the repo root defines domain vocabulary.
- `docs/adr/` holds architecture decision records.

## Before exploring

Read the root glossary and ADRs relevant to the area being explored.
If they do not exist, proceed silently. The domain-modeling skill creates
them lazily as terms and decisions are resolved.

## Use the glossary's vocabulary

Use defined domain terms in issue titles, proposals, hypotheses, and tests.
Follow the glossary's guidance on synonyms.

When a needed concept is missing, reconsider whether it belongs to the
project's vocabulary; record real gaps for domain-modeling.

## Surface ADR conflicts

Explicitly identify any proposal that contradicts an existing ADR,
including the ADR reference and the reason to reconsider it.
