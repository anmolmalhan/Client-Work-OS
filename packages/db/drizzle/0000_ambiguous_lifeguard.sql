CREATE TYPE "public"."payment_status" AS ENUM('unpaid', 'partial', 'paid', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."request_status" AS ENUM('request_received', 'details_pending', 'payment_pending', 'in_progress', 'submitted', 'completed', 'delivered', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."service_category" AS ENUM('forms', 'documents', 'conversion', 'status_support', 'account_support');--> statement-breakpoint
CREATE TYPE "public"."urgency_level" AS ENUM('normal', 'urgent');--> statement-breakpoint
CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"whatsapp_number" text NOT NULL,
	"email" text,
	"consent_given" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"file_name" text NOT NULL,
	"file_type" text NOT NULL,
	"file_url" text,
	"is_sensitive" boolean DEFAULT true NOT NULL,
	"status" text DEFAULT 'received' NOT NULL,
	"uploaded_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"payment_mode" text DEFAULT 'upi' NOT NULL,
	"reference" text,
	"paid_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" text NOT NULL,
	"client_id" uuid NOT NULL,
	"service_id" uuid NOT NULL,
	"description" text NOT NULL,
	"deadline" date,
	"urgency" "urgency_level" DEFAULT 'normal' NOT NULL,
	"status" "request_status" DEFAULT 'request_received' NOT NULL,
	"total_amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"paid_amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"balance_amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"payment_status" "payment_status" DEFAULT 'unpaid' NOT NULL,
	"admin_notes" text[] DEFAULT '{}' NOT NULL,
	"final_output_file" text,
	"delivery_confirmation" text,
	"latest_update" text DEFAULT 'Request received.' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"category" "service_category" NOT NULL,
	"description" text NOT NULL,
	"starting_price" numeric(10, 2),
	"required_documents" text[] NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_request_id_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_request_id_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "requests" ADD CONSTRAINT "requests_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "requests" ADD CONSTRAINT "requests_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "clients_whatsapp_number_idx" ON "clients" USING btree ("whatsapp_number");--> statement-breakpoint
CREATE INDEX "documents_request_id_idx" ON "documents" USING btree ("request_id");--> statement-breakpoint
CREATE INDEX "payments_request_id_idx" ON "payments" USING btree ("request_id");--> statement-breakpoint
CREATE UNIQUE INDEX "requests_request_id_idx" ON "requests" USING btree ("request_id");--> statement-breakpoint
CREATE INDEX "requests_status_idx" ON "requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "requests_payment_status_idx" ON "requests" USING btree ("payment_status");--> statement-breakpoint
CREATE INDEX "requests_client_id_idx" ON "requests" USING btree ("client_id");--> statement-breakpoint
CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");