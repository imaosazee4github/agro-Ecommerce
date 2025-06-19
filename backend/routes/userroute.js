import express  from 'express'
import {
    createUser, 
    deleteUserById, 
    getAllUser, 
    getCurrentUserProfile, 
    getUserById, 
    loggedOutUser, 
    loginUser,
    updateUserById,
    updateUserProfile} from '../controllers/userControllers.js'
import { authenticate, authorizedAdmin } from '../middlewares/authMiddleware.js'


const router = express.Router()

router
  .route("/")
  .post(createUser) // POST /api/users
  .get(authenticate, authorizedAdmin, getAllUser); 


router.post("/login", loginUser)
// router.get('/allUser', authenticate, authorizedAdmin, getAllUser);

router.post("/logout", loggedOutUser)

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateUserProfile);

  router
  .route("/:id") 
  .delete(authenticate, authorizedAdmin, deleteUserById)
  .get(authenticate, authorizedAdmin, getUserById)
  .put(authenticate, authorizedAdmin, updateUserById)

export default router