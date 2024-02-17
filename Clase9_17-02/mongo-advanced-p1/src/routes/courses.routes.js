const { Router } = require("express");

const courseModel = require("../model/courses.model");

const router = Router();

router.get(`/`, async (req, res) => {
  try {
    let students = await studentsModel.find();
    return res.json({
      message: `courses list`,
      students,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post(`/`, async (req, res) => {
  try {
    const courseBody = req.body;
    let newCourse = await courseModel.create(courseBody);

    return res.json({
      message: `course created`,
      newCourse,
    });

  } catch (error) {
  console.log(error); 
  }
});



module.exports = router;