const ProductControllers = require("../controllers/product.controller");

const router = require("express").Router();

router.post('/create', ProductControllers.create)
router.get('/one/:id', ProductControllers.getOne)
router.get('/all', ProductControllers.getAll)

module.exports = router;