import React,{useEffect} from 'react'
import { FaHeartCircleCheck, FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { 
    addToFavourites, 
    removeFromFavourites, 
    setFavourites } from '../../redux/features/favorite/favouriteSlice';
import { 
    addFavouriteToLocalStorage, 
    getFavoritesFromLocalStorage, 
    removeFavouriteFromLocalStorage } from '../../utils/localStorage';


const HeartIcon = ({product}) => {
    const dispatch  = useDispatch()
    const favourites = useSelector(state => state.favourites) || []

    const isFavourite = favourites.some((p) => p._id === product._id)

    useEffect(() => {
      const  favouritesFromLocalStorage = getFavoritesFromLocalStorage()
      dispatch(setFavourites(favouritesFromLocalStorage))

    }, [])

    const toggleFavourites = () => {
        if(isFavourite){
            dispatch(removeFromFavourites(product))
            // remove product from the localStorage
            removeFavouriteFromLocalStorage(product._id)
        }else{
            dispatch(addToFavourites(product))
            // add product to the localStorage
            addFavouriteToLocalStorage(product)
        }
    }



  return (
    <div onClick={toggleFavourites} className='absolute top-2 right-5 cursor-pointer'>
        {isFavourite ? 
        (<FaHeartCircleCheck  className='text-green-500'/>
    ) : (<FaRegHeart className='text-white' />)}
    </div>
  )
}

export default HeartIcon