# Preserve the generated frontend during infrastructure migration

We will migrate TaskFlow to an independently maintainable React + NestJS foundation while preserving the generated frontend source, stylesheets, public assets, and HTML entry file byte-for-byte. Directory relocation and changes to manifests, TypeScript configuration, Vite configuration, and scripts are allowed; formatting, import rewrites, and deleting unused frontend components are not. Record the original commit and verify protected files against it with relocation accounted for.

This preserves the original implementation and provides an auditable boundary at the cost of retaining existing defects and incidental Replit text inside protected files. Runtime independence from Replit does not require erasing every textual reference. Changes to dependencies, assets, and build configuration require separate behavioral verification because file identity alone does not establish UI or behavior equivalence.

Existing defects must be documented and distinguished from migration regressions, with fixes deferred. If a protected-source defect prevents an agreed migration check from passing, record the conflict explicitly rather than silently weakening the check or editing source.
