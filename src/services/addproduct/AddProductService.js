const { body, validationResult, check } = require("express-validator");
var AddProductProvider = require("./AddProductProvider").AddProductProvider;
const { auth } = require("../../middleware/auth");
var ROUTES = require("../../api-routes/Routes").ROUTES;

<<<<<<< HEAD
var AddProductService= function(app){
let addProductProvider=new AddProductProvider();
    app.post(ROUTES.ADD_PRODUCT, auth,
        check([
            'emailId',
            'productName',
            'productType',
            'expiryDate',
            'purchaseDate'
        ]).exists()
        , (req, res) => {
            addProductProvider.addProduct(function (err, response) {
                res.send(response);
            }, req.body)
        });
    
    app.get(ROUTES.GET_PRODUCT,auth, (req, res) => {
        addProductProvider.getProduct(function (err, response) {
            res.send(response);
        }, req.body);
    });
}
exports.AddProductService=AddProductService;
=======
var AddProductService = function (app) {
  let addProductProvider = new AddProductProvider();
  app.post(
    ROUTES.ADD_PRODUCT,
    auth,
    check([
      "emailId",
      "productName",
      "productType",
      "expiryDate",
      "purchaseDate",
    ]).exists(),
    (req, res) => {
      addProductProvider.addProduct(function (err, response) {
        res.send(response);
      }, req.body);
    }
  );

  app.get(ROUTES.GET_PRODUCT, auth, body("emailId").exists(), (req, res) => {
    addProductProvider.getProduct(function (err, response) {
      res.send(response);
    }, req.query);
  });
};
exports.AddProductService = AddProductService;
>>>>>>> 78951306db53709cae8c780c7371affac2f54bf5
