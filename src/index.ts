import guess from "@/features/guess";
import topics from "@/features/topics";
import { factory } from "./factory";

const app = factory.createApp();

app.route("/api/topics", topics);
app.route("/api/guess", guess);

export default app;
