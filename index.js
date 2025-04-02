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
const corsOptions =
  process.env.NODE_ENV === "development"
    ? {
        origin: true,
        credentials: true,
      }
    : {
        origin: function (origin, callback) {
          const allowedOrigins = [
            process.env.NETLIFY_URL,
          ];
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
      };

app.use(cors(corsOptions));

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

function debugMiddleware(req, res, next) {
  console.log("Request URL:", req.url);
  console.log("Request Method:", req.method);
  console.log("Request Body:", req.body);
  next();
}


app.use(session(sessionOptions));

   
app.use(express.json());
app.use(debugMiddleware);
Lab5(app);
Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);

app.listen(process.env.PORT || 4000);