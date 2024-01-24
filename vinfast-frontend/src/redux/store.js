import { configureStore } from '@reduxjs/toolkit'

import productModalReducer from './product-modal/productModalSlice'
import cartItemsReducer from './shopping-cart/cartItemsSlide'
import userReducer from "./user/userSlice";
import customerReducer from "./customer/customerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    customerCar:  customerReducer,
    productModal: productModalReducer,
    cartItems: cartItemsReducer
  }
})

export default store
