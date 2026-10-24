# Choose shared-schema and OpenAPI tooling

Status: open
Type: grilling
Labels: wayfinder:grilling
Parent: [TaskFlow API Architecture & Integration Readiness — decision map](../map.md)
Assignee: unassigned
Blocked by: 09

## Question

Given the tooling evidence, which schema/type-inference/OpenAPI approach should the shared contracts package use, and what compatibility constraints follow? Decide the package boundary, supported schema features, input/output treatment and how OpenAPI remains consistent with the canonical runtime schemas without duplicate authority. Decide whether client generation is needed rather than assuming it. Choose tooling only through explicit user approval. Record a specification and any later package/build work; do not change dependencies or workspace configuration.

## Resolution requirements

Human-in-the-loop decision. Consult grilling and domain-modeling. Explicit user approval is required before resolution. Link detailed design assets from this ticket; the map indexes only the answer gist. Planning-only: no application, dependency or production package changes.

## Prerequisites

- [Research shared-schema and OpenAPI tooling compatibility](09-schema-tooling-evidence.md)
