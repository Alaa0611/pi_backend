const express = require("express");
const router = express.Router();
const controller = require("../controller/course.controller");
const validate = require("../middll/validate");
const courseSchema = require("../middll/course.validation");

router.post("/", validate(courseSchema), controller.createCourse);
router.get("/", controller.getAllCourses);
router.get("/:id", controller.getCourseById);
router.put("/:id", validate(courseSchema), controller.updateCourse);
router.delete("/:id", controller.deleteCourse);

module.exports = router;
