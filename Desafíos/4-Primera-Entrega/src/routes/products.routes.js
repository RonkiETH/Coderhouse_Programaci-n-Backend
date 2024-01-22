const { Router } = require("express");
const productsController = require('../controllers/products.controller');
const router = Router();

router.use(productsController.readProducts);

router.get('/', productsController.getProducts);

router.get('/:pid', productsController.getProductById);

router.post('/', productsController.addProduct);

router.put('/:pid', productsController.updateProduct);

router.delete('/:pid', productsController.deleteProduct);

module.exports = router;
