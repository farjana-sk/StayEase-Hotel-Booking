const express = require("express");

const mongoose = require("mongoose");

const Booking = require("./models/Booking");

const app = express();



app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.log(err);
});
app.get("/", (req, res) => {
    res.render("index");
});


app.get("/booking", (req, res) => {
    res.render("booking");
});

app.post("/booking", async (req, res) => {

    try {

        const booking = new Booking(req.body);

        await booking.save();

        res.render("success");

    } catch (err) {

        console.log(err);

        res.send("Something went wrong!");

    }

});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});