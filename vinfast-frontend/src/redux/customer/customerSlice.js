import { createSlice } from "@reduxjs/toolkit"
import cookies from 'react-cookies'

export const customerSlice = createSlice ({
    name: "customer",
    initialState: {
        customer: cookies.load('customer'),
    },
    reducers: {
        customerCar: (state, action) => {
            state.customer = action.payload;
        },
        customerBike: (state) => {
            state.customer = null;
        }
    }
})

export const { customerCar, customerBike } = customerSlice.actions;

export const selectCustomer = (state) => state.customerCar.customer
export default customerSlice.reducer