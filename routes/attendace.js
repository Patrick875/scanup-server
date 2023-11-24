const attendanceController = require("../controllers/attendanceController");
const attendanceListController = require("../controllers/attendaceListController");
const express = require("express");

const router = express.Router();

router.post("/qr", attendanceController.generateQr);
router.post("/", attendanceController.create);
router.get("/lists", attendanceListController.getLists);
router.post("/lists", attendanceListController.createList);
router.get("/list/current", attendanceListController.getCurrentList);
router.get("/list/:listId", attendanceListController.getList);

module.exports = router;
