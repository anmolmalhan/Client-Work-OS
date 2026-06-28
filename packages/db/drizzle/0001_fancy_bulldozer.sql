CREATE TYPE "public"."job_category" AS ENUM('latest_job', 'result', 'admit_card', 'answer_key', 'syllabus');--> statement-breakpoint
CREATE TYPE "public"."job_post_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TABLE "job_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"organization" text NOT NULL,
	"category" "job_category" NOT NULL,
	"status" "job_post_status" DEFAULT 'published' NOT NULL,
	"short_info" text NOT NULL,
	"vacancies" integer,
	"application_fee" text,
	"eligibility" text NOT NULL,
	"age_limit" text,
	"important_dates" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"apply_start_date" date,
	"apply_end_date" date,
	"apply_link" text,
	"notification_link" text,
	"official_website" text,
	"meta_title" text,
	"meta_description" text,
	"is_featured" boolean DEFAULT false NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "job_posts_slug_idx" ON "job_posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "job_posts_category_idx" ON "job_posts" USING btree ("category");--> statement-breakpoint
CREATE INDEX "job_posts_status_idx" ON "job_posts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "job_posts_published_at_idx" ON "job_posts" USING btree ("published_at");