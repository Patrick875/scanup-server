const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/user");
const attendanceRouter = require("./routes/attendace");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/api/v1/", userRouter);
app.use("/api/v1/attendance/", attendanceRouter);

module.exports = app;
