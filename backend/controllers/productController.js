import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../modals/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    //Validaton
    switch (true) {
      case !name:
        return res.json({ error: "Product name is required!" });
      case !description:
        return res.json({ error: "Product description is required!" });
      case !price:
        return res.json({ error: "Product price is required!" });
      case !category:
        return res.json({ error: "Product category is required!" });
      case !quantity:
        return res.json({ error: "Product quantity is required!" });
      case !brand:
        return res.json({ error: "Product brand is required!" });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Product name is required!" });
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    //Validaton
    switch (true) {
      case !name:
        return res.json({ error: "Product name is required!" });
      case !description:
        return res.json({ error: "Product description is required!" });
      case !price:
        return res.json({ error: "Product price is required!" });
      case !category:
        return res.json({ error: "Product category is required!" });
      case !quantity:
        return res.json({ error: "Product quantity is required!" });
      case !brand:
        return res.json({ error: "Product brand is required!" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const removedProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = Product.countDocuments({ ...keyword }).limit(pageSize);
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server erorr" });
  }
});

const fetchProductsById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product no found" });
  }
});

const fetchAllProduct = asyncHandler(async(req, res) => {
   try{
    const products = await Product.find({}).populate('category').limit(12).sort({createAt : -1})

    res.json(products)

   }catch(error){
    console.error(error)
    res.status(500).json({error: "Server  Error"})
   }
})

const addProductReviews = asyncHandler(async(req, res) => {
    try{
      const {rating, comment} = req.body

      const product = await Product.findById(req.params.id)
      if(product){
        const alreadyReviewed = product.reviews.find(rvw => rvw.user.toString() === req.user._id.toString())

        if(alreadyReviewed){
          res.status(400)
          throw new Error("Product already reviewed")
        }

        const review = {
          name : req.user.name,
          rating : Number(rating),
          comment,
          user : req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => 
          item.rating + acc, 0)/product.reviews.length

        await product.save()
        res.status(201).json({message : "Review added"})
      }else{
        res.status(404)
        throw new Error("Product not found")
      }

    }catch(error){
      console.error(error)
      res.status(404).json(error.message)
    }
})

// const fetchTopProducts = asyncHandler(async(req, res) => {
//   try{
//     const products = await Product.find({}).sort({rating: -1}).limit(4)
//     res.json(products)

//   }catch(error){
//    console.error(error)
//    res.status(500).json({ message: error.message });
//   }

// })

const fetchTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.json(products);
});

const fetchNewProducts = asyncHandler(async(req, res) => {
  try{
    const products = await Product.find({}).sort({_id: -1}).limit(5);
    res.json(products)

  }catch(error){
console.error(error)
  res.status(400).json(error.message)

  }
})

export {
  addProduct,
  updateProductDetails,
  removedProduct,
  fetchProducts,
  fetchProductsById,
  fetchAllProduct,
  addProductReviews,
  fetchTopProducts,
  fetchNewProducts
};
