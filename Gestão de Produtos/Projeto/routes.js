// INIT
let router = require("express").Router();
router.get("/", function (req, res) {
	res.status(200).send("API Online.");
});




// PRODUCTS CONTROLLER
var productsController = require("./controllers/productsController");
router.route("/products")
.get(productsController.index)
.post(productsController.new);

router.route("/products/:id_product")
.get(productsController.view)
.patch(productsController.update)
.put(productsController.update)
.delete(productsController.delete);





// CATEGORIES CONTROLLER
var categoriesController = require("./controllers/categoriesController");
router.route("/categories")
.get(categoriesController.index)
.post(categoriesController.new);

router.route("/categories/:id_category")
.get(categoriesController.view)
.patch(categoriesController.update)
.put(categoriesController.update)
.delete(categoriesController.delete);







// EXPORT API ROUTES
module.exports = router;