import express from 'express'
import { authenticate, authorizedAdmin } from '../middlewares/authMiddleware.js'
import { 
    createCategory, 
    deleteCategory, 
    getAllCategory, 
    getCategory, 
    updateCategory 
} from '../controllers/categoryController.js'


const router = express.Router()

router.post("/", authenticate, authorizedAdmin, createCategory)
router.put("/:categoryId", authenticate, authorizedAdmin, updateCategory)
router.delete("/:categoryId", authenticate, authorizedAdmin, deleteCategory)

router.get("/categories", getAllCategory)
router.get("/:id", getCategory)


export default router