const { Router } = require("express");

const studentsModel = require("../model/students.model");

const router = Router();

router.get(`/`, async (req, res) => {
  try {
    let students = await studentsModel.find();
    // populate('courses.course', { title: 1 });
    return res.json({
      message: `student list`,
      students,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: students.routes.js:38 ~ router.get ~ error:",
      error
    );
  }
});

router.post(`/`, async (req, res) => {
  try {
    const studentBody = req.body;
    let newStudent = await studentsModel.create(studentBody);

    console.log(studentBody);

    return res.json({
      message: `student created`,
      newStudent,
    });

  } catch (error) {
  console.log(error); 
  }
});

router.post('/inscription', async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    let student = await studentsModel.findOne({ _id: studentId });

    console.log(student);

    student.courses.push({ course: courseId });

    await studentsModel.updateOne({ _id: studentId }, student);

    return res.json({
      message: `This student ${student.firstName} has a new Course`,
      student,
    });

  } catch (error) {
    console.log(error);
  }
} )



module.exports = router;