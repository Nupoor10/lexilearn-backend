const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/userRoutes");
const summaryRoutes = require('./routes/summaryRoutes');
const textToSpeechRoutes = require('./routes/textToSpeechRoutes');
const speechToTextRoutes = require('./routes/speechToTextRoutes');

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", async(req, res) => {
    res.send('Welcome to the lexilearn server');
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/summary", summaryRoutes);
app.use("/api/v1/texttospeech", textToSpeechRoutes);
app.use("/api/v1/speechtotext", speechToTextRoutes);

app.listen(PORT, () => {
    console.log(`Server started at Port : ${PORT}`);
});