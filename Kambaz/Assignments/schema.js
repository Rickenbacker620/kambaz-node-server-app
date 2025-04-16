import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    points: Number,
    due: Date,
    from: Date,
    to: Date,
    course: { type: String, ref: "CourseModel" },
  },
  { collection: "assignments" },
);
export default schema;
