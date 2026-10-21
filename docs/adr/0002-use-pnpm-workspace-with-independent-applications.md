# Use a pnpm workspace with independently configured applications

Retain the existing pnpm package manager and organize the preserved React frontend in `apps/web` and a standard NestJS backend in `apps/api`. Each application owns its manifest and application configuration; the root owns the shared lockfile and development/build/check entry points.

Choose this over introducing Nx, Turborepo, or Nest CLI monorepo mode because this migration has two independently configured applications and no demonstrated need for additional orchestration or shared packages. Do not create shared packages until an actual need appears. This keeps the frontend preservation boundary explicit while providing a foundation for later backend development.
