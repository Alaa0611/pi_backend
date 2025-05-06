const yup = require("yup");

const lessonSchema = yup.object({
  title: yup.string().min(3).required(),
  content: yup.string(),
  videoUrl: yup.string().url(),
  order: yup.number().integer(),
  courseId: yup.string().required()
});

module.exports = lessonSchema;
