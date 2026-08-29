# Dosa Business AI

Private, role-aware business research and decision-support foundation for a Polish dosa-batter manufacturing venture. This first phase deliberately provides platform architecture only: it does **not** perform web research, supplier/property research, financial modelling, customer outreach, or present unverified business data.

## Technology stack

- **Next.js 15 + React 19 + TypeScript** for a typed, server-capable web application with a simple deployment path.
- **PostgreSQL + Prisma** for a reliable relational system of record, schema migrations, and typed database access.
- **Auth.js / NextAuth architecture** for pluggable authentication. No provider is enabled until the identity policy is agreed.
- **Zod** is included for future server-side validation at API boundaries.

The application uses the Next.js App Router. UI lives in `src/app`; cross-cutting authorization is isolated in `src/auth`; persistence is defined once in `prisma/schema.prisma`. This separation keeps future domain modules independent of the dashboard shell.

## Local setup

### Prerequisites

- Node.js 20.9 or later
- PostgreSQL 16 or later

### Run the application

```bash
cp .env.example .env
# Edit DATABASE_URL and replace AUTH_SECRET with a strong random value.
npm install
npm run db:generate
npm run db:migrate -- --name init
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run checks with:

```bash
npm run typecheck
npm run build
```

## Environment and secrets

All runtime configuration belongs in `.env`, which is excluded from Git. Start from `.env.example`.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string, including credentials. |
| `AUTH_SECRET` | Secret used to protect auth/session state. Generate a unique random value. |
| `AUTH_URL` | Canonical application URL. |
| `OPENAI_API_KEY` | Reserved for the future server-side AI integration; never expose it to browser code. |

## Authentication and authorization

`src/auth/config.ts` holds the Auth.js integration point and protects `/dashboard` once an identity provider is configured. `src/auth/permissions.ts` is the single source of truth for role checks. The database persists one role per user:

| Role | Intended access |
| --- | --- |
| Owner/Admin | Full workspace and team access. |
| Investor | Dashboard, cost, research, and scenario visibility. |
| Manager | Day-to-day operational records, research, and scenarios. |
| Employee | Dashboard, customer, order, and delivery workflows. |

New server actions and route handlers must resolve the authenticated user, then call `can(role, permission)` before reading or changing protected data. Navigation visibility is not a security boundary; authorization must always occur on the server.

## Database architecture

The PostgreSQL schema is intentionally normalized and has no seeded data. It supports the following future modules:

- **Users and access:** `User` with the `Role` enum.
- **Facility planning:** `Property`, including type, area, rent, and currency.
- **Supply chain:** `Supplier`, `Ingredient`, and the many-to-many `IngredientSupplier` relation.
- **Operations:** `BusinessCost`, `Customer`, `Order`, and one-to-one `Delivery` records.
- **Decision support:** `ResearchReport` includes structured source metadata; `FinancialScenario` stores versionable JSON assumptions and results.

Money and physical-area values use PostgreSQL decimal columns rather than floats. All entities have identifiers and timestamps; optional fields permit a workflow to begin as a prospect/draft and become operational after validation.

## Suggested next milestones

1. Provision managed PostgreSQL, run the initial migration, and add a Prisma client singleton.
2. Select an identity provider, configure Auth.js, add session role claims, and enforce permissions in server actions.
3. Build validated CRUD modules for properties, suppliers, ingredients, and costs; add audit logging and tests.
4. Define research-source provenance and human approval workflows before enabling external research or AI retrieval.
5. Add financial modelling, order/delivery workflows, and outreach only after their business rules and data governance are approved.

## Project structure

```text
src/app/              Next.js routes and presentation shell
src/auth/             Authentication configuration and role permissions
prisma/schema.prisma  PostgreSQL data model
.env.example          Required environment variable template
```
