const DetailServices = require("../controllers/detail.controller");

const router = require("express").Router();

router.post('/create', DetailServices.create)
router.get('/all', DetailServices.getAll)

module.exports = router;