import { Navigate, Route, Routes } from "react-router-dom"
import { ChooseHotDishes } from "../components/products/ChooseHotDishes"
import { ChooseDrinks } from "../components/products/ChooseDrinks"
import { ChooseCocktails } from "../components/products/ChooseCocktails"
import { ChooseDessert } from "../components/products/ChooseDessert"
import { ChooseAppetizers } from "../components/products/ChooseAppetizers"
import { ChooseGrills } from "../components/products/ChooseGrills"
import { ChooseSoups } from "../components/products/ChooseSoups"
import { ChooseColdDishes } from "../components/products/ChooseColdDishes"
import { AuthAccessPoint } from "../auth/AuthAccessPoint"
import { Discounts } from "../pages/Discounts"

export const OrderRouter = () =>{
    return(
        <Routes>
            <Route path="admin/*" element={<AuthAccessPoint/>}>
                <Route path="discounts" element={<Discounts/>} />
            </Route>
            <Route path="hot/dishes" element={<ChooseHotDishes/>} />
            <Route path="cold/dishes" element={<ChooseColdDishes/>} />
            <Route path="soups" element={<ChooseSoups/>} />
            <Route path="grills" element={<ChooseGrills/>} />
            <Route path="appetizers" element={<ChooseAppetizers/>} />
            <Route path="desserts" element={<ChooseDessert/>} />
            <Route path="cocktails" element={<ChooseCocktails/>} />
            <Route path="drinks" element={<ChooseDrinks/>} />
            <Route path="*" element={<Navigate to="/home/hot/dishes"/>} />
        </Routes>
    )
}