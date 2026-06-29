import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  businessProfile,
  createJobPostSchema,
  faqs,
  getBusinessWhatsappLink,
  getServiceWhatsappLink,
  pricing,
  submitRequestSchema,
  trackRequestSchema,
  updateJobPostSchema,
  updateRequestStatusSchema,
} from "../../../../packages/domain/src";
import {
  createJob,
  deleteJob,
  getJob,
  listJobs,
  listJobsGroupedByCategory,
  recordJobView,
  updateJob,
} from "../repositories/jobs";
import {
  createRequest,
  getDashboard,
  getRequest,
  getService,
  listRequests,
  listServices,
  requestWhatsappLink,
  trackStoredRequest,
  updateRequestStatus,
} from "../repositories/requests";
import { requireAdmin } from "../middleware/auth";

export const v1Router = new Hono()
  .get("/", (c) =>
    c.json({
      ok: true,
      version: "v1",
      endpoints: {
        business: "/api/v1/business",
        services: "/api/v1/services",
        pricing: "/api/v1/pricing",
        faq: "/api/v1/faq",
        whatsapp: "/api/v1/whatsapp",
        dashboard: "/api/v1/dashboard",
        requests: "/api/v1/requests",
        track: "/api/v1/track",
        jobs: "/api/v1/jobs",
      },
    }),
  )
  .get("/business", (c) => c.json({ data: businessProfile }))
  .get("/services", async (c) => c.json({ data: await listServices() }))
  .get("/services/:serviceId", async (c) => {
    const service = await getService(c.req.param("serviceId"));
    return service ? c.json({ data: service }) : c.json({ error: "Service not found." }, 404);
  })
  .get("/pricing", (c) => c.json({ data: pricing }))
  .get("/faq", (c) => c.json({ data: faqs }))
  .get("/whatsapp", (c) => c.json({ data: { whatsappLink: getBusinessWhatsappLink() } }))
  .get("/dashboard", requireAdmin, async (c) =>
    c.json({
      data: await getDashboard(),
    }),
  )
  .get("/requests", requireAdmin, async (c) => {
    const status = c.req.query("status");
    const query = c.req.query("query")?.trim().toLowerCase();

    return c.json({ data: await listRequests({ status, query }) });
  })
  .get("/requests/:requestId", requireAdmin, async (c) => {
    const request = await getRequest(c.req.param("requestId"));
    return request ? c.json({ data: request }) : c.json({ error: "Request not found." }, 404);
  })
  .post("/requests", zValidator("json", submitRequestSchema), async (c) => {
    const input = c.req.valid("json");
    const request = await createRequest(input);

    if (!request) {
      return c.json({ error: "Service not found." }, 404);
    }

    return c.json(
      {
        data: {
          request,
          whatsappLink: await requestWhatsappLink(request.requestId),
        },
      },
      201,
    );
  })
  .post("/track", zValidator("json", trackRequestSchema), async (c) => {
    const input = c.req.valid("json");
    const request = await trackStoredRequest(input.requestId, input.whatsappNumber);
    return request ? c.json({ data: request }) : c.json({ error: "No matching request found." }, 404);
  })
  .patch("/requests/:requestId/status", requireAdmin, zValidator("json", updateRequestStatusSchema), async (c) => {
    const request = await updateRequestStatus(c.req.param("requestId"), c.req.valid("json"));

    if (!request) {
      return c.json({ error: "Request not found." }, 404);
    }

    return c.json({
      data: {
        request,
        whatsappLink: await requestWhatsappLink(request.requestId),
      },
    });
  })
  .get("/requests/:requestId/whatsapp", async (c) => {
    const whatsappLink = await requestWhatsappLink(c.req.param("requestId"));
    return whatsappLink ? c.json({ data: { whatsappLink } }) : c.json({ error: "Request not found." }, 404);
  })
  .get("/services/:serviceId/whatsapp", async (c) => {
    const service = await getService(c.req.param("serviceId"));
    return service ? c.json({ data: { whatsappLink: getServiceWhatsappLink(service) } }) : c.json({ error: "Service not found." }, 404);
  })
  .get("/jobs", async (c) => {
    const category = c.req.query("category");
    const query = c.req.query("query")?.trim();

    if (c.req.query("grouped") === "true") {
      return c.json({ data: await listJobsGroupedByCategory() });
    }

    return c.json({ data: await listJobs({ category, query }) });
  })
  .get("/jobs/:slug", async (c) => {
    const job = await getJob(c.req.param("slug"));
    return job ? c.json({ data: job }) : c.json({ error: "Job post not found." }, 404);
  })
  .post("/jobs/:slug/view", async (c) => {
    const views = await recordJobView(c.req.param("slug"));
    return views === undefined ? c.json({ error: "Job post not found." }, 404) : c.json({ data: { views } });
  })
  .post("/jobs", requireAdmin, zValidator("json", createJobPostSchema), async (c) => {
    const job = await createJob(c.req.valid("json"));
    return c.json({ data: job }, 201);
  })
  .patch("/jobs/:slug", requireAdmin, zValidator("json", updateJobPostSchema), async (c) => {
    const job = await updateJob(c.req.param("slug"), c.req.valid("json"));
    return job ? c.json({ data: job }) : c.json({ error: "Job post not found." }, 404);
  })
  .delete("/jobs/:slug", requireAdmin, async (c) => {
    const deleted = await deleteJob(c.req.param("slug"));
    return deleted ? c.json({ data: { deleted: true } }) : c.json({ error: "Job post not found." }, 404);
  });
