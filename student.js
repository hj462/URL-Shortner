const router = require('express').Router();
const Student = require('../models/student');
const ObjectId = require('mongodb').ObjectId;
const checkAuth = require('./check-auth');

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const regno = req.body.regno;
    const course = req.body.course;
    console.log(req.body);
    const student = new Student({name, regno, course})
    student.save().then((id) => res.json( `Student Added id is ${id}`))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route("/").get(checkAuth, (req, res) => {
  const student = Student.find().then((data) => res.json(data)).catch((error) => res.status(400).json('Error' + error));
})

router.route("/:id").get((req, res) => {
    const student = Student.findById(req.params.id).then((data) => res.json(data)).catch((error) => res.status(400).json('Error' + error));
})

router.route("/:id").delete((req, res) => {
    const student = Student.findOneAndDelete(req.params.id).then((data) => res.json('Student Deleted')).catch((error) => res.status(400).json('Error' + error));
})

router.route("/:id").put((req, res) => {
    const query = {_id: req.params.id}
    const data = {...req.body}
    console.log(req);
    console.log(query);
    const student = Student.findOneAndUpdate(query, data).then((data) => res.json('Updated')).catch((error) => res.status(400).json('Error' + error));
})


module.exports = router;
