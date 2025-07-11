import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
    useUpdateProductMutation, 
    useDeleteProductMutation, 
    useGetProductByIdQuery, 
    useUploadProductImageMutation} from '../../redux/api/productApiSlice'
import { useFetchAllCategoriesQuery } from '../../redux/api/apiCategorySlice'
import { toast } from 'react-toastify'
import AdminMenu from './AdminMenu'
    

const ProductUpdate = () => {
    const params = useParams()
    const{data : productData} = useGetProductByIdQuery(params._id)

    const [uploading, setUploading] = useState(false);
    const[image, setImage] = useState(productData?.image || "")
    const[name, setName] = useState(productData?.name || "")
    const[description, setDescription] = useState(productData?.description || "")
    const[price, setPrice] = useState(productData?.price || "")
    const[quantity, setQuantity] =useState(productData?.quantity || "")
    const[category, setCategory] = useState(productData?.category || "")
    const[brand, setBrand] = useState(productData?.brand || "")
    const[stock, setStock] = useState(productData?.countInStock)

    const navigate = useNavigate()

    const{data: categories = []} = useFetchAllCategoriesQuery()
    const[uploadProductImage] = useUploadProductImageMutation()
    const [updateProduct] = useUpdateProductMutation()
    const[deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
        if(productData && productData._id){
            setName(productData.name)
            setDescription(productData.description)
            setPrice(productData.price)
            setCategory(productData.categories?._id)
            setStock(productData.countInStock)
            setBrand(productData.brand)
            setImage(productData.image)
        }

    }, [productData])

    const uploadFileHandler = async(e) => {
      const file = e.target.files[0];
      if(!file) return;

      const formData = new FormData();

      formData.append("image", file)

      setUploading(true)
      setImage(file);

      try{
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message || "Image uploaded sucessfully");
        setImage(res.image)
      }catch(error) {
      toast.error(error?.data?.message || error?.message || "Upload failed");
      setImage("");
    } finally {
      setUploading(false);
    }

    }


     const handleUpdate = async(e) => {
      e.preventDefault();
    
      try {
        const formData = new FormData();
        formData.append("image", image); // <-- make sure this is a string (the image URL from upload)
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("quantity", quantity);
        formData.append("brand", brand);
        formData.append("countInStock", stock);
    
        const { data } = await updateProduct({productId : params._id, formData});
  
        if (data?.error) {
          console.error("❌ Submit Error:", data.error); // ✅ log data.error, not `error`
          toast.error(data.error.message || "Product update failed. Try again!");
        } else {
          toast.success(`${data.name} is updated successfully`);
          navigate("/admin/allproductslist");
        }
    
      } catch (error) {
        console.error("❌ Catch Error:", error);
        toast.error(error?.data?.message || "Product update failed. Try again!");
      }
    };
    

    const handleDelete = async() => {
      try{
        let verifyDelete = window.confirm("Are you sure you want to delete this product?")

        if(!verifyDelete) return;

        const data = await deleteProduct(params._id)
        toast.success(`${data?.name} is deleted`)
        navigate("/admin/allproductslist");
      }catch(error){
        console.log(error)
        toast.error("Product delete failed")
      }

    };


  return ( 
   <div className="container xl:mx-[12rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12"> Create Produce</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
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
            <div className='flex justify-between'>
              <button
               onClick={handleUpdate}
              className="mt-5 py-4 px-10 font-semibold text-lg rounded-lg text-red-500 bg-green-500 text-white"
            >
              Update
            </button>

            <button
               onClick={handleDelete}
              className="mt-5 py-4 px-10 mx-11 font-semibold text-lg rounded-lg text-red-500 bg-red-500 text-white"
            >
              Delete
            </button>

            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate