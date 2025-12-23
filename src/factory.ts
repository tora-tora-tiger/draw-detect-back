import { createFactory } from "hono/factory";
import { logger } from "hono/logger";

const factory = createFactory<{ Bindings: CloudflareBindings }>({
  initApp: app => {
    app.use(logger());
  },
});

export { factory };
