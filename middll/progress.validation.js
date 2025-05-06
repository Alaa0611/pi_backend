const yup = require("yup");

const progressSchema = yup.object({
  body: yup.object({
    user: yup.string().required("L'utilisateur est requis"),
    course: yup.string().required("Le cours est requis"),
    currentLesson: yup.string(),
    status: yup.string().oneOf(["in_progress", "completed"]),
  }),
});

module.exports = progressSchema;
