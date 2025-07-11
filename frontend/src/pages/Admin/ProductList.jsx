import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchAllCategoriesQuery } from "../../redux/api/apiCategorySlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();

  const { data: categories } = useFetchAllCategoriesQuery();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    setImage(file);

    try {
      const res = await uploadProductImage(formData).unwrap();

      toast.success(res.message || "Image uploaded sucessfully");
      setImageUrl(res.image); // Store the server response image path
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Upload failed");
      setImage("");
      setImageUrl(null);
    } finally {
      setUploading(false);
    }
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const productData = new FormData();
    productData.append("image", imageUrl); // <-- make sure this is a string (the image URL from upload)
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("category", category);
    productData.append("quantity", quantity);
    productData.append("brand", brand);
    productData.append("countInStock", stock);

    const { data } = await createProduct(productData);

    if (data?.error) {
      console.error("❌ Submit Error:", data.error); // ✅ log data.error, not `error`
      toast.error(data.error.message || "Product creation failed. Try again!");
    } else {
      toast.success(`${data.name} is created`);
      navigate("/");
    }

  } catch (error) {
    console.error("❌ Catch Error:", error);
    toast.error(error?.data?.message || "Product creation failed. Try again!");
  }
};

  return (
    <div className="container xl:mx-[12rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12"> Create Produce</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className='border-none  text-black px-4  block w-full text-center rounded-lg font-bold cursor-pointer py-4'>
              {image ? "" : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-black"}
              />
            </label>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap gap-10">
              <div className="one">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 rounded-lg w-[25rem] border bg-[#101011] text-white font-semibold"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ">
                <label htmlFor="name block">Price</label>
                <br />
                <input
                  type="number"
                  className="p-4 mb-3 rounded-lg w-[25rem] border bg-[#101011] text-white font-semibold"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-10">
              <div className="three">
                <label htmlFor="name block">Quantity</label>
                <br />
                <input
                  type="number"
                  className="p-4 mb-3 rounded-lg w-[25rem] border bg-[#101011] text-white font-semibold"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="four">
                <label htmlFor="name block">Brand</label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 rounded-lg w-[25rem] border bg-[#101011] text-white font-semibold"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
            <label htmlFor="" className="my-5">
              Description
            </label>

            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[93%]  text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="flex flex-wrap gap-10">
              <div>
                <label htmlFor="name block">Count in stock</label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 bg-[#101011] border rounded-lg w-[25rem] text-white font-semibold"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="">
                <label htmlFor="">Category</label>
                <br />
                <select
                  placeholder="Choose Category"
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-4 mb-3 bg-[#101011] border rounded-lg w-[25rem] text-white font-semibold"
                >
                  {Array.isArray(categories) &&
                    categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <button
               onClick={handleSubmit}
              className="mt-5 py-4 px-10 font-semibold text-lg rounded-lg text-red-500 bg-red-500 text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
