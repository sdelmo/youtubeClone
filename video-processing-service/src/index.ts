import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());

app.post("/process-video", (req, res) => {
    // Get path of the input video file from the request body, converts to 360p

    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    // Handle errors

    if (!inputFilePath || !outputFilePath) {
        res.status(400).send("Bad Request: Missing input or output file path");
    }

    // Convert video to 360p

    ffmpeg(inputFilePath)
        .outputOptions("-vf", "scale=-1:360")
        .on("end", () => {
            res.status(200).send("Video Processing Finished successfully");

        }).on("error", (err) => {
            console.log(`An error ocurred: ${err.message}`);
            res.status(500).send(`Internal Server Error: ${err.message}`);
        })
        .save(outputFilePath);

});


const port = process.env.PORT || 3000; // standard way to provide port at run time

app.listen(port, () => {
    console.log(`Video Processing service running at http://localhost:${port}`);
})