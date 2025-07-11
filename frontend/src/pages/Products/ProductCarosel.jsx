import { useGetTopProductQuery } from "../../redux/api/productApiSlice"
import Message from "../../components/Message"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from 'moment'
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore
} from 'react-icons/fa';
import displayCurrency from "../../helper/displayCurrency"

const ProductCarosel = () => {
    const {data: products, isLoading, error} = useGetTopProductQuery()
    
   console.log(products)
    const settings = {
        dots: false,
        infinite : true,
        speed : 500,
        slidesToScroll :1,
        arrows : true,
        autoplay : true,
        autoPlaySpeed : 3000,
    };


  return (
    <div className="mb-4 xl:block lg:block md:block">
        {
            isLoading ? null : error ? (
                <Message variant='danger'>
                    {error?.data.message || error.message}
                </Message>
            ) : <Slider {...settings} className="xl:w-[25rem] lg:w-[25rem] md:[36rem] sm:w-[20rem] sm:block mt-3  ml-2">
               {
                products.map(
                    ({
                        image,
                        _id,
                        name, 
                        price, 
                        description, brand, createAt, numReviews, rating, quantity, countInStock}) => {
                     return (
                         <div key={_id}>
                    <img
                       src={image} 
                       alt={name} 
                       className="w-[95%] rounded-lg object-cover h-[20rem]" 
                       />

                       <div className="flex mt-4 justify-between border border-black border-dashed bg-green-100 w-[95%] p-2">
                        <div className="w-[35%]">
                           <h2>{name}</h2>
                            <p className="slate-100">{displayCurrency (price)}</p> <br /> <br />  <br /> <br /><br />
                            <p className="px-2 w-[23rem] font-bold underline">{description.substring(0, 170)}</p>
                        </div>
                        <div className="bg-red-900">
                    

                        </div>
                        <div className="one w-[35%]">
                            <h1 className="flex items-center  mb-6">
                                    <FaStore className="mr-2 text-black  "/>Brand:{brand}
                                </h1>
                                 <h1 className="flex items-center mb-6">
                                    <FaClock className="mr-2 text-black mb-5 "/>Added:{" "} {moment(createAt).fromNow()}
                                </h1>

                                 <h1 className="flex items-center mb-6 w-[5rem]">
                                    <FaStar className="mr-2 text-black mb-5"/>Reviews:{" "}{numReviews}
                                </h1>
                        </div>
                         <div className="two w-[30%]">
                              <h1 className="flex items-center mb-6 w-[7rem]">
                                    <FaStar className="text-black mr-2"/> Ratings: {" "} {Math.round(rating)}
                                </h1>
                                <h1 className="flex items-center mb-6 w-[7rem] gap-2 p-1">
                                    <FaShoppingCart className="text-black"/> Quantity: {" "}{quantity}
                                </h1>
                                <h1 className="flex items-center mb-6 w-[7rem]">
                                    <FaBox className="text-black mr-2"/>Stock {" "} {countInStock}
                                </h1>
                        </div>
                       </div>
                       
                       
                        
                        

                    



                       {/* <div className="flex justify-between mt-4">
                        <div className="one">
                            <h2>{name}</h2>
                            <p>{displayCurrency (price)}</p> <br /> <br />
                            <p className="w-[25rem]">{description.substring(0, 170)}</p>
                        </div>

                        <div className="">

                            <div className="one">
                                <h1 className="flex items-center mb-6">
                                    <FaStore className="mr-2 text-black "/>Brand:{brand}
                                </h1>
                                 <h1 className="flex items-center mb-6">
                                    <FaStore className="mr-2 text-black "/>Added:{" "} {moment(createAt).fromNow()}
                                </h1>

                                 <h1 className="flex items-center mb-6 w-[5rem]">
                                    <FaStore className="mr-2 text-black  w-[5rem]"/>Reviews:{" "}{numReviews}
                                </h1>
                            </div>

                            <div className="two">
                                <h1 className="flex items-center mb-6 w-[5rem]">
                                    <FaStar className="text-black mr-2"/> Ratings: {" "} {Math.round(rating)}
                                </h1>
                                <h1 className="flex items-center mb-6 w-[5rem]">
                                    <FaShoppingCart className="text-black mr-2"/> Quantity: {" "} {quantity}
                                </h1>
                                <h1 className="flex items-center mb-6 w-[5rem]">
                                    <FaBox className="text-black mr-2"/> In Stock: {" "} {countInStock}
                                </h1>
                            </div>
                        </div>


                       </div> */}
                    </div>
                     )
                    }
            )}
                
            </Slider>
        }
    </div>
  )
}

export default ProductCarosel