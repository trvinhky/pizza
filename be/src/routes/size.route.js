const SizeControllers = require("../controllers/size.controller");

const router = require("express").Router();

router.post('/create', SizeControllers.create)
router.get('/one/:id', SizeControllers.getOne)
router.get('/all', SizeControllers.getAll)

module.exports = router;