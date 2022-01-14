const mongoose = require("mongoose");
const router = require("express").Router();
const cors = require("cors");


router.use(cors());


const moonSchema = new mongoose.Schema({
    username: String,
    mobile: Number,
    email: String,
    address: String
});
let moon = mongoose.model('UserDetails', moonSchema);

router.post('/', async (req, res) => {

    // let myData = new moon(req.body)

    try {
        const user = await moon.findOne({ username: req.body.username, mobile: req.body.mobile, email: req.body.email });
        if (user)
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" });

        await new moon({ ...req.body }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
router.get('/', (req, res) => {
    moon.find({}, function (error, data) {
        res.send(data)
    })
});

module.exports = router;