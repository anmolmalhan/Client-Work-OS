# Client Work OS

A WhatsApp-first digital service center for managing remote client work such as online form filling, document uploads, PDF editing, file conversion, application submission, and digital support.

The product is designed for a service provider who wants clients to send documents through WhatsApp while the business manages requests, pricing, payment status, progress, and delivery through a clean website and admin workspace.

## Product Model

Client Work OS keeps WhatsApp as the main communication channel, but adds a professional website layer around it.

```mermaid
flowchart LR
  A["Client visits website"] --> B["Views services and pricing"]
  B --> C["Submits request or opens WhatsApp"]
  C --> D["Shares documents and instructions"]
  D --> E["Admin reviews request"]
  E --> F["Price and payment are confirmed"]
  F --> G["Work is completed"]
  G --> H["Final file or confirmation is delivered on WhatsApp"]
  H --> I["Client tracks status by request ID"]
```

## Core Pages

- **Home** - explains the service, trust points, process, popular services, pricing preview, and WhatsApp CTA.
- **Services** - lists supported digital services with pricing notes, required documents, and WhatsApp request buttons.
- **Pricing** - shows fixed-price, starting-price, and variable-price service categories.
- **Submit Request** - captures client details, service type, deadline, work description, consent, and document selection.
- **Track Request** - lets clients check request status using request ID and WhatsApp number.
- **Contact** - highlights WhatsApp, phone, email, working hours, remote service area, and FAQs.
- **FAQ** - answers common client questions about documents, safety, payment, timing, urgent work, and confirmation.
- **Admin Dashboard** - shows request stats, filters, search, payment status, and request management.
- **Request Details** - shows client info, uploaded documents, payment progress, admin notes, delivery status, and WhatsApp update action.

## Services Supported

- Online form filling
- Application submission
- Document upload
- PDF merge
- PDF compression
- Image to PDF conversion
- PDF to image conversion
- Photo and signature resizing
- File format conversion
- Admit card download
- Result checking
- Application status checking
- Account creation and login support
- Digital document support

## Services Not Included

This project is remote-first and digital-only. It does not include:

- Printing
- Lamination
- Photocopying
- Public PC usage

## Architecture

The project follows a ZeroStarter-style monorepo structure.

```text
Client Work OS
├── api/hono             # Hono API service
├── web/next             # Next.js website and admin UI
├── packages/domain      # Shared services, pricing, statuses, schemas, demo data, helpers
├── packages/db          # Drizzle PostgreSQL schema and migrations
├── packages/env         # Typed environment validation
├── packages/tsconfig    # Shared TypeScript configs
└── docs/PRD.md          # Product requirements document
```

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Hono
- Drizzle ORM
- PostgreSQL schema
- Zod validation
- Bun workspaces
- Turborepo

## Getting Started

Install dependencies:

```bash
npx bun@1.3.4 install
```

Run the website:

```bash
npx bun@1.3.4 run --filter @wdsc/web-next dev
```

Website URL:

```text
http://localhost:3100
```

Run the API:

```bash
npx bun@1.3.4 run --filter @wdsc/api-hono dev
```

API URL:

```text
http://localhost:4100
```

## Verification

```bash
npx bun@1.3.4 run check
npx bun@1.3.4 run build
npx bun@1.3.4 run db:generate
```

## Demo Request Tracking

Use this sample request on the Track Request page:

```text
Request ID: SDS-2026-0001
WhatsApp number: 9876500001
```

## Current Status

This repository currently contains a polished MVP interface and working project structure. The UI, demo data, API routes, shared domain package, and database schema are in place.

Before using it for real client documents, add:

- Admin authentication
- Persistent database-backed request storage
- Real document upload storage
- Real submit-request API integration
- Admin save actions for status, payment, notes, and final files
- Production business phone, WhatsApp number, and email

## Product Goal

Client Work OS is built to help a digital service provider look professional, receive client work through WhatsApp, organize requests, track payments, manage delivery, and build trust with non-technical clients.
