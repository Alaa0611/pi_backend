const yup = require("yup");

const courseSchema = yup.object({
  title: yup.string().min(3).required(),
  description: yup.string(),
  level: yup.string().oneOf(["Beginner", "Intermediate", "Advanced"]),
  published: yup.boolean()
});

module.exports = courseSchema;
