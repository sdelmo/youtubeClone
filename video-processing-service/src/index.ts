import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(port, () => {
    console.log(`Video Processing service running at http://localhost:${port}`);
})