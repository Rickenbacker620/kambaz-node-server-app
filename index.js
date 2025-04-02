import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbaz/Users/router.js";
import CourseRoutes from "./Kanbaz/Courses/routes.js";
import ModuleRoutes from "./Kanbaz/Modules/router.js";
import "dotenv/config";
import session from "express-session";
import AssignmentRoutes from "./Kanbaz/Assignments/router.js";
import EnrollmentsRoutes from "./Kanbaz/Enrollments/router.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

app.use(express.json());
Lab5(app);
Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);

app.listen(process.env.PORT || 4000);