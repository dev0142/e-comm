import {combineReducers} from "redux"
import { productReducer, userReducer} from "./productReducer"


const reducers=combineReducers({
    allProducts:productReducer,
    user:userReducer
})

export default reducers;