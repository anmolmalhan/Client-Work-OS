# Product Requirements Document

# WhatsApp-Based Digital Service Center with Website UI v0.1

## 1. Project Overview

WhatsApp-Based Digital Service Center is a remote-first digital service business platform. Clients do not need to visit physically, use a computer, or understand online portals themselves. They send documents through WhatsApp or the website, and the service provider completes digital work on their behalf.

The business focuses on:

- online form filling
- application submission
- document upload
- PDF editing
- file conversion
- admit card, result, and application status support
- account creation and login support
- digital client support

The website UI makes the business look professional, explains services clearly, captures requests, accepts document uploads, shows pricing, lets clients track status, and keeps WhatsApp as the primary communication channel.

The core flow is:

```text
Client -> WhatsApp / Website Request -> Documents -> Admin Work -> Payment -> Submission / Delivery -> Confirmation
```

## 2. Problem Statement

Many clients need digital work done but do not have the confidence, time, documents organized, or computer access to complete it themselves. They often depend on local service providers, but physical visits waste time and document handling through chat becomes unorganized.

Current problems:

- clients repeatedly ask what documents are needed
- requests get lost in WhatsApp chats
- service pricing is unclear before work starts
- payment status is not tracked cleanly
- clients do not know whether work is received, in progress, submitted, or delivered
- service providers manually type the same WhatsApp updates
- completed files, receipts, and confirmation screenshots are scattered
- sensitive documents need careful handling and consent

## 3. Target Users

### Primary Clients

- students applying for exams, scholarships, admit cards, and results
- job seekers needing forms, resumes, uploads, and account support
- villagers and senior citizens who need remote digital assistance
- small business owners needing application or document help
- workers who use WhatsApp but do not want to use government or institution portals directly

### Admin / Service Provider

The business owner or staff member who receives requests, checks documents, quotes price, completes work, records payment, uploads final output, and sends WhatsApp updates.

## 4. Business Goals

- generate digital service leads through a professional website
- make WhatsApp the main conversion channel
- reduce manual follow-up and repeated explanations
- maintain clean request history and client history
- track payment, pending work, and completed deliveries
- build trust through clear pricing, process, FAQ, and privacy messaging
- enable the service provider to work for remote clients without physical visits

## 5. Services Offered

v0.1 includes only remote digital services:

- online form filling
- application submission
- document upload
- PDF merge
- PDF compression
- image to PDF conversion
- PDF to image conversion
- photo and signature resizing
- file format conversion
- admit card download
- result checking
- application status checking
- account creation and login support
- digital document support

Each service should include:

- name
- short description
- estimated price or variable price note
- required documents
- WhatsApp request button

## 6. Services Excluded

The product must not include:

- printing
- lamination
- photocopying
- scanning as a physical shop service
- public PC usage
- cyber café seat booking
- offline document pickup
- hardware repair
- government portal integrations
- WhatsApp Business API automation in v0.1

## 7. Website UI Requirements

The website must be:

- mobile-first
- clean and professional
- easy for non-technical users
- fast-loading
- WhatsApp-focused
- trust-building
- clear about remote digital service only

Required website pages:

- Home
- Services
- Pricing
- Submit Request
- Track Request
- Contact
- FAQ
- Admin Dashboard
- Admin Request Details

Every important page should include a clear WhatsApp call-to-action.

## 8. User Journey

### Client Journey

1. Client lands on the home page.
2. Client understands the remote digital service model.
3. Client views services or pricing.
4. Client clicks “Send Request on WhatsApp” or submits a website request form.
5. Client uploads documents or sends documents on WhatsApp.
6. Admin reviews request and confirms price.
7. Client pays through UPI or another accepted mode.
8. Admin completes the digital work.
9. Admin sends confirmation, receipt, and final output through WhatsApp.
10. Client can track status using request ID and WhatsApp number.

### Admin Journey

1. Admin opens dashboard.
2. Admin views all requests.
3. Admin filters by status or searches by client name/phone.
4. Admin opens request details.
5. Admin reviews documents and work description.
6. Admin adds price and payment status.
7. Admin updates request status.
8. Admin uploads final output or receipt.
9. Admin sends WhatsApp update.
10. Admin maintains client history for future requests.

## 9. Admin Workflow

Admin workflow stages:

```text
Request Received
Details Pending
Payment Pending
In Progress
Submitted
Completed
Delivered
Cancelled
```

Admin must be able to:

- view all requests
- filter by status
- search by client name or phone number
- open request details
- view uploaded documents
- update request status
- add service price
- mark payment as pending, paid, or partial
- upload final receipt or completed file
- add admin notes
- generate WhatsApp update links
- maintain client history

## 10. Functional Requirements

### Public Website

- System shall display a professional home page.
- System shall list all digital services.
- System shall show pricing categories.
- System shall allow clients to submit request details.
- System shall allow document upload fields in the request form.
- System shall require client consent for data usage.
- System shall provide WhatsApp redirect buttons.
- System shall allow request tracking with request ID and WhatsApp number.
- System shall show contact details and FAQs.

### Request Management

- System shall generate readable request IDs.
- System shall store client name, WhatsApp number, optional email, service type, description, deadline, uploaded documents, consent, status, payment status, price, admin notes, and final output file.
- System shall allow status updates.
- System shall allow payment status updates.
- System shall support partial payment.
- System shall show client request history.

### WhatsApp

- System shall generate WhatsApp links.
- Message text shall include client name, request ID, service, status, price/balance where relevant, and business name.
- System shall support messages for request received, details pending, payment pending, work in progress, completed, delivered, and receipt sharing.

### Admin Dashboard

- System shall show total requests.
- System shall show pending requests.
- System shall show payment pending requests.
- System shall show completed requests.
- System shall show daily revenue estimate.
- System shall include request table, filters, search, and quick actions.

## 11. Non-Functional Requirements

- Website should load quickly on mobile internet.
- UI should work on low-end mobile devices.
- Forms should be short and easy to understand.
- The app should use clear language.
- Important actions should be reachable within one or two taps.
- Admin dashboard should support repeated daily use.
- Code should be type-safe, modular, and ready for database/auth integration.

## 12. Data Privacy and Security Requirements

- Consent checkbox is required before submitting documents.
- Only necessary information should be collected.
- Sensitive documents should be clearly marked.
- Admin UI should show privacy reminders.
- Uploaded files should support deletion in future versions.
- Client data should not be exposed publicly.
- Request tracking should require request ID plus WhatsApp number.
- Production version must use authenticated admin access.
- File storage must use private buckets or signed URLs when implemented.

## 13. Payment Workflow

Payment states:

- unpaid
- partial
- paid
- refunded

Workflow:

1. Client submits request.
2. Admin reviews documents and confirms final price.
3. Client pays by UPI or accepted method.
4. Admin marks payment as partial or paid.
5. Work begins or continues.
6. Receipt or confirmation is sent after payment/work completion.

Pricing notes:

- fixed-price services can show a starting price.
- variable services show “Price depends on work.”
- urgent work may add extra charges.
- final price is confirmed after checking documents.

## 14. Request Tracking System

Clients can track request status using:

- request ID
- WhatsApp number

Statuses:

- Request Received
- Details Pending
- Payment Pending
- In Progress
- Submitted
- Completed
- Delivered
- Cancelled

Tracking page should show:

- current status
- service type
- payment status
- deadline
- latest update
- WhatsApp button for questions

## 15. MVP Features

MVP must include:

- Home page
- Services page
- Pricing page
- Submit Request page
- Track Request page
- Contact page
- FAQ page
- Admin dashboard
- Request details page
- typed service catalog
- typed demo request data
- WhatsApp link generation
- request status badges
- payment status badges
- professional mobile-first layout
- full PRD documentation

## 16. Future Enhancements

- Better Auth admin login
- PostgreSQL-backed request CRUD
- UploadThing, Supabase Storage, or Cloudinary uploads
- private signed document URLs
- PDF receipt generation
- automatic UPI QR / payment links
- WhatsApp Business API integration
- email notifications
- customer portal
- staff roles
- analytics and conversion tracking
- multilingual Hindi/Hinglish UI
- service templates
- admin activity history

## 17. Success Metrics

- number of WhatsApp clicks
- number of request form submissions
- number of completed requests
- conversion rate from visitor to WhatsApp/request
- average time from request received to work started
- number of paid requests
- number of repeat clients
- payment pending amount tracked
- admin response time
- client satisfaction and repeat usage

## 18. Risks and Solutions

| Risk | Solution |
| --- | --- |
| Clients may still prefer direct WhatsApp only | Keep WhatsApp buttons primary on every page |
| Clients may upload incomplete documents | Show required documents per service and use Details Pending status |
| Data privacy concerns | Add consent, privacy copy, sensitive document labels, future signed URLs |
| Pricing confusion | Show starting prices and confirm final price after checking documents |
| Admin workload becomes messy | Use request status, payment status, filters, and admin notes |
| Too many services make UI confusing | Group services by category and use cards |
| Urgent work creates pressure | Show urgent charges and deadline fields |
| No real auth in MVP shell | Clearly mark demo/admin shell and wire Better Auth next |

## Final Product Definition

WhatsApp-Based Digital Service Center with Website UI is a professional mobile-first website and admin dashboard for remote digital service work. It helps clients submit online work requests, send documents, understand pricing, contact through WhatsApp, and track status while giving the service provider a clean dashboard to manage requests, payments, documents, notes, outputs, and client communication.
