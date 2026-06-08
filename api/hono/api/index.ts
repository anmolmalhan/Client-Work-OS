import { app } from "../src/index";

export const config = {
  runtime: "edge",
};

export default function handler(request: Request) {
  return app.fetch(request);
}
