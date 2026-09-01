# CLAUDE.md

## Project Purpose
Web application for Dr. Adelyn Pereira, a clinical physiotherapist with previous public healthcare experience in Qatar (Hamad Medical Corporation / PHCC network). The site enables patients to review clinical services, book in-person or virtual appointments, consult via chat, and access an administrative management portal.

## Architecture Overview
- **Framework:** Next.js (App Router) with TypeScript and React 19.
- **Styling:** Tailwind CSS v4 with mobile-first responsive breakpoints (Mobile: `<768px`, Tablet: `768px–1024px`, Desktop: `>1024px`).
- **State & Data Handling:** Server Components for static rendering; Client Components only when local state, browser APIs, or form interactivity are required.
- **Directory Structure:**
  - `src/app/` — Application routes, layouts, and API handlers.
  - `src/components/` — Modular, reusable UI components.
  - `src/lib/` — Utility functions, validation schemas, and database/API clients.
  - `src/types/` — Shared TypeScript type and interface definitions.

## Feature Scope & Phased Roadmap
1. **Header & Navigation:** Responsive layout with desktop bar, mobile hamburger menu, and direct booking CTA.
2. **Hero Section:** Value proposition, Dr. Adelyn's credentials, Qatar public health background, and booking CTAs.
3. **Services Catalog:** Detailed breakdown of clinical rehabilitation, post-op recovery, sports injury management, and pricing.
4. **Appointment Scheduling:** Interactive date/time picker, service selector, patient details form, and confirmation state.
5. **Patient Consultation & Chat:** Intake questionnaire and direct messaging channel for pre-consultation inquiries.
6. **Admin Dashboard:** Schedule viewer, appointment status management (confirm, reschedule, cancel), and patient logs.

## Coding Standards
- Build strictly one feature at a time. Never scaffold unrequested pages or components in advance.
- Maintain responsive parity across desktop, tablet, and mobile for every UI component.
- Enforce strict TypeScript types without using `any`.
- Keep components small, isolated, and focused on a single responsibility.
- Validate all builds with `npm run build` and resolve all TypeScript or lint errors before committing.
- Follow conventional commits format: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.

## Security Rules
- Sanitize and validate all form inputs on both client and server boundaries.
- Never hardcode secrets, API keys, or database connection strings in source files.
- Restrict sensitive medical notes, contact data, and admin endpoints behind authenticated routes.
- Prevent Cross-Site Scripting (XSS) by avoiding raw HTML rendering or unescaped user inputs.

## Token Saving & File Modification Rules
- Only inspect, create, or modify files directly required for the active prompt or task.
- Do not edit or re-write unrelated project files.
- Provide concise terminal commands, targeted file patches, or single file contents instead of dumping full repository trees.
- Do not generate placeholder application code for future phases until explicitly instructed.
