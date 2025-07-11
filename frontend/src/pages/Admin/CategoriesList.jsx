import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useFetchAllCategoriesQuery,
  useUpdatedCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/api/apiCategorySlice";

import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoriesList = () => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const { data: categories } = useFetchAllCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();

  const [updateCategory] = useUpdatedCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Product category name is required");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.data.name} product is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Adding product category failed, try again.");
    }
  };

  const handleUpdatedCategory = async (e) => {
    e.preventDefault();
    if (!updatedName) {
      toast.error("Product category name is required ");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatedName,
        },
      }).unwrap();
      console.log("update result", result);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result?.data?.name} is updated`);
        setSelectedCategory(null);
        setUpdatedName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result?.data?.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category, Try again later ");
    }
  };

  return (
    <div className="ml-[12rem] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12 font-bold">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-black font-bold border border-red-900 text-white py-2 px-4 rounded-lg m-3 hover:bg-red-500 hover:text-black
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdatedName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatedName}
            setValue={(value) => setUpdatedName(value)}
            handleSubmit={handleUpdatedCategory}
            ButtonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoriesList;
