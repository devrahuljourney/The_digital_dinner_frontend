import { combineReducers } from "@reduxjs/toolkit";

import cartSlice from "../slices/cartSlice";



const rootReducer = combineReducers({
    
    cart : cartSlice
})

export default rootReducer;