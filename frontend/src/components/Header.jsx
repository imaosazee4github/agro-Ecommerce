import { useGetTopProductQuery } from '../redux/api/productApiSlice'
import Loader from './Loader'
import SmallProduct from '../pages/Products/SmallProduct'
import ProductCarosel from '../pages/Products/ProductCarosel'

const Header = () => {
    const {data, isLoading, error} = useGetTopProductQuery()
    if(isLoading){
      return <Loader />
    }

    if(error) {
      return <h1>ERRORS</h1>
    }


  return (
    <>
  <div className='flex justify-around '>
    <div className='xl:block lg:hidden md:hidden sm:hidden ml-[11rem]'>
      <div className='grid grid-cols-2'>
        {data.map((product) => (
          <div key={product._id}>
            <SmallProduct product={product}/>
          </div>
        ))}
      </div>

    </div>
    <ProductCarosel />

  </div>
    </>)
  
}

export default Header