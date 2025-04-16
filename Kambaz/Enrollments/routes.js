import * as enrollmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/enrollments", async (req, res) => {
    const enrollments = await enrollmentsDao.findAllEnrollments();
    res.send(enrollments);
  });
  app.delete(
    "/api/enrollments/unenroll/:userId/:courseId",
    async (req, res) => {
      const { userId, courseId } = req.params;
      const status = await enrollmentsDao.unenrollUserFromCourse(
        userId,
        courseId,
      );
      res.send(status);
    },
  );
  app.post("/api/enrollments/enroll/:userId/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    const status = await enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.send(status);
  });
}
