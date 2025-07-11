import express from 'express'
import formidable from 'express-formidable'
import { authenticate, authorizedAdmin } from '../middlewares/authMiddleware.js'
import  checkId from '../middlewares/checkId.js'
import { 
    addProduct, 
    removedProduct, 
    updateProductDetails, 
    fetchProducts,
    fetchProductsById,
    fetchAllProduct,
    addProductReviews,
    fetchTopProducts, 
    fetchNewProducts
} from '../controllers/productController.js'

const router = express.Router()

router.get("/allProducts", fetchAllProduct)

router.get("/topProducts", fetchTopProducts)
router.get("/newProducts", fetchNewProducts)

router
.route("/")
.post(authenticate, authorizedAdmin, formidable(), addProduct)
.get(fetchProducts)

router
.route("/:id")
.get(fetchProductsById)
.put(authenticate, authorizedAdmin, formidable(), updateProductDetails)
.delete(authenticate, authorizedAdmin, removedProduct)

router
.route("/:id/reviews")
.post(authenticate, checkId, addProductReviews)


export default router