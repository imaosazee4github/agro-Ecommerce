import asyncHandler from "../middlewares/asyncHandler.js"
import Category from "../modals/categoryModal.js";



const createCategory = asyncHandler(async(req, res) =>{
  
    const { name } = req.body

   if(!name){
    res.status(400)
    throw new Error("Category name is required")
   }

   const existingCategory = await Category.findOne({name})

   if(existingCategory){
    res.status(400)
    throw new Error("Category already exists");
   }

   const category = await Category.create({name});

   res.status(200).json({
    message : "Category create successfully",
    data : category
   })

    
} ) 

// const  updateCategory = asyncHandler(async(req, res) => {

//         const {name} = req.body;

//         const {categoryId} = req.params;

//         const category = await Category.findById(categoryId)

//         if(!category){
//             res.status(404).json({
//                 error : "Category not found"
//             })
//         }

//          if(name) category.name = name;

//         const updatedCategory = await category.save()
//         res.status(200).json(updatedCategory);

// })

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { categoryId } = req.params;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  category.name = name;

  const updatedCategory = await category.save();
  res.status(200).json({
    message: "Category updated successfully",
    data: updatedCategory,
  });
});


const deleteCategory = asyncHandler(async(req, res) => {
    const {categoryId} = req.params

     const removed = await Category.findByIdAndDelete(categoryId);

     if(!removed) {
        res.status(404).json({error : "Category not found"});
     }


      res.status(200).json({
        message : "Category deleted successfully.",
        data : removed
      });

});

const getAllCategory = asyncHandler(async (req, res) => {
  const allCategory = await Category.find({});
  res.status(200).json(allCategory);
});


const getCategory = asyncHandler(async(req, res) => {
    
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(404).json(error, "Category not found")
        }
        res.status(200).json(category)
})

export {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    getCategory

}