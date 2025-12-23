import topics from "@/features/topics";
import { factory } from "./factory";

const app = factory.createApp();

app.route("api/topics", topics);

export default app;
