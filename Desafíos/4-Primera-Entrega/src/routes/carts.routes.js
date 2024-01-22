const { Router } = require("express");
const cartsController = require('../controllers/carts.controller');
const router = Router();

router.use(cartsController.readCarts);
router.use(cartsController.readProducts);

router.post('/', cartsController.createCart);
router.get('/:cid', cartsController.getCartById);
router.post('/:cid/product/:pid', cartsController.addProductToCart);

module.exports = router;
