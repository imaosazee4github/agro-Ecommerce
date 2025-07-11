import { useSelector } from "react-redux"

const FavouriteCount = () => {
    const favourites = useSelector((state) => state.favourites);
    const favouriteCount = favourites.length;
  return (
    <div  className="absolute left-3 bottom-3">
        {favouriteCount > 0 && (
            <span className="px-1  py-0 text-sm text-white bg-red-500  rounded-full">
                {favouriteCount}
            </span>
        )}
        </div>
  )
}

export default FavouriteCount