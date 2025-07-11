import { Link } from 'react-router-dom'
import displayCurrency from '../../helper/displayCurrency'
import HeartIcon from './HeartIcon'

const SmallProduct = ({product}) => {
  return (
    <div className='w-[20rem] ml-[2rem] p-3'>
        <div className='relative'>
            <img src={product.image}  
            alt={product.name} 
            className='h-auto rounded-lg'/>

            <HeartIcon product={product} />

            <div className='p-54'>
                <Link to={`/product/${product._id}`}>
                <h2 className='flex justify-between items-center'>
                    <div>{product.name}</div>
                    <span 
                    className='bg-red-100 text-red-900 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-100 '>
                        {displayCurrency (product?.price)}
                    </span>
                </h2>
                </Link>

            </div>
        </div>

    </div>
  )
}

export default SmallProduct