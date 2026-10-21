# Issue tracker: Local Markdown

Issues and specs live as Markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`.
- Spec: `.scratch/<feature-slug>/spec.md`.
- Implementation tickets: `.scratch/<feature-slug>/issues/<NN>-<slug>.md`,
  numbered from `01`, with one file per ticket.
- Record triage state in a `Status:` line near the top of each ticket,
  using the strings in `triage-labels.md`.
- Append comments and conversation history under `## Comments`.

## Publishing and fetching

To publish a spec or ticket, create its file at the appropriate path above,
creating directories as needed.

To fetch a ticket, read its referenced file. Resolve a bare issue number
within the relevant feature; ask for the feature if ambiguous.

## Wayfinding operations

- Map: `.scratch/<effort>/map.md`, containing Notes, Decisions-so-far, and Fog.
- Child tickets: `.scratch/<effort>/issues/NN-<slug>.md`, numbered from `01`.
  Put the question in the body and record `Type:` as `research`, `prototype`,
  `grilling`, or `task`.
- Wayfinding tickets use `Status: open`, `Status: claimed`, or
  `Status: resolved` for their lifecycle.
- Record dependencies in `Blocked by: NN, NN` near the top.
  A ticket is unblocked when every listed dependency is resolved.
- Frontier: choose the lowest-numbered open, unblocked, unclaimed ticket.
- Claim: set `Status: claimed` and save before starting work.
- Resolve: append the answer under `## Answer`, set `Status: resolved`,
  and add a summary and link to the map's Decisions-so-far.
