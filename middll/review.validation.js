const yup = require("yup");

const reviewSchema = yup.object({
  body: yup.object({
    course: yup.string().required("Le cours est requis"),
    user: yup.string().required("L'utilisateur est requis"),
    rating: yup.number().min(1).max(5).required("La note est requise"),
    comment: yup.string(),
  }),
});

module.exports = reviewSchema;
