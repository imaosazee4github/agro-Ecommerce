// add a product to the localstorage
export const addFavouriteToLocalStorage = (product) => {
 const favourites = getFavoritesFromLocalStorage()
 if(!favourites.some((p) => p._id === product._id)){
    favourites.push(product)
    localStorage.setItem('favourites', JSON.stringify(favourites));

 }
};

//remove a product from the localstorage

export const removeFavouriteFromLocalStorage = (productId) => {
    const favourites = getFavoritesFromLocalStorage();
    const updateFavourites = favourites.filter((product) => product._id !== productId)
     localStorage.setItem('favourites', JSON.stringify(updateFavourites))
}

//retrive favourites from localstorage 1st
export const getFavoritesFromLocalStorage = () => {
    const favouritesJSON = localStorage.getItem('favourites')
    return favouritesJSON ? JSON.parse(favouritesJSON) : []
}