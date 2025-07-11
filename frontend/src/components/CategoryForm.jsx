import React from 'react'

const CategoryForm = ({
    value, 
    setValue, 
    handleSubmit,
    ButtonText = "Submit", 
    handleDelete}) => {
  return (
    <div className='p-3'>
        <form onSubmit={handleSubmit} className='space-y-3'>
            <input 
            type='text' 
            placeholder='Add product categories' 
            className='py-3 px-4 border rounded-lg w-full'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            />
            <div className='flex justify-between'>
                <button 
                className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus-ring-opacity-50'>
                    {ButtonText}
                </button>
                {handleDelete && (
                        <button 
                        onClick={handleDelete}
                        className='bg-red-500  text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-bg-red-500 focus-ring-opacity-50 '>
                            Delete
                        </button>
                    )
                }
            </div>

        </form>

    </div> 
  )
}

export default CategoryForm