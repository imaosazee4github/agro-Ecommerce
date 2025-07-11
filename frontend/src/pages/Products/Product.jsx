import { Link } from "react-router-dom"
import displayCurrency from "../../helper/displayCurrency"
import HeartIcon from "./HeartIcon"



const Product = ({product}) => {
  return (
    <div className="w-[30rem ml-[2rem] relative p-3">
      <div className="relative">
        <img 
        src={product.image} 
        alt={product.name}  
        className="w-[30rem] rounded"/>

        <HeartIcon product={product} />
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
        <h2 className="flex justify-between items-center">
          <div className="text-lg">{product.name}</div>
          <span className="bg-red-100 text-red-900 py-0.5 text-sm font-meduim mr-2 px-2.5
          rounded-full dark:bg-red-900 dark:text-red-300">{displayCurrency (product.price)}</span>
        </h2>
        
        </Link>

      </div>
    </div>
  )}
export default Product