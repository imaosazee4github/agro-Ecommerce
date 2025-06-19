import { apiSlice } from "./apiSlice";
import { CATEGORIES_URL } from "../constants";


export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createCategory : builder.mutation({
            query : (newCategory) => ({
                url : `${CATEGORIES_URL}`,
                method : 'POST',
                body : newCategory
            }),
        }),

        updatedCategory : builder.mutation({
            query : ({categoryId, updatedCategory}) => ({
                url : `${CATEGORIES_URL}/${categoryId}`,
                method : 'PUT',
                body : updatedCategory
            }),
        }),

        deleteCategory : builder.mutation({
            query : (categoryId) => ({
            url : `${CATEGORIES_URL}/${categoryId}`,
            method : 'DELETE'
            }),
        }),

        fetchAllCategories : builder.query({
            query : () => `${CATEGORIES_URL}/categories`
        }),
    }),

});

export const {
    useCreateCategoryMutation,
    useFetchAllCategoriesQuery,
    useUpdatedCategoryMutation,
    useDeleteCategoryMutation
} = categoryApiSlice