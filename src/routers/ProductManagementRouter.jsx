import { Navigate, Route, Routes } from "react-router-dom"
import { ChooseHotDishes } from "../components/settings/products/ChooseHotDishes"
import { ChooseDrinks } from "../components/settings/products/ChooseDrinks"
import { ChooseCocktails } from "../components/settings/products/ChooseCocktails"
import { ChooseDessert } from "../components/settings/products/ChooseDessert"
import { ChooseAppetizers } from "../components/settings/products/ChooseAppetizers"
import { ChooseGrills } from "../components/settings/products/ChooseGrills"
import { ChooseSoups } from "../components/settings/products/ChooseSoups"
import { ChooseColdDishes } from "../components/settings/products/ChooseColdDishes"
import { ProductInfiniteScrollWrapper } from "../widgets/ProductInfiniteScrollWrapper"

export const ProductManagementRouter = () =>{
    return(
        <div className="d-flex flex-column h-100">
            <ProductInfiniteScrollWrapper header="Products Management" baseRoute="/settings/product/management">
                <Routes>
                    <Route path="hot/dishes" element={<ChooseHotDishes/>} />
                    <Route path="cold/dishes" element={<ChooseColdDishes/>} />
                    <Route path="soups" element={<ChooseSoups/>} />
                    <Route path="grills" element={<ChooseGrills/>} />
                    <Route path="appetizers" element={<ChooseAppetizers/>} />
                    <Route path="desserts" element={<ChooseDessert/>} />
                    <Route path="cocktails" element={<ChooseCocktails/>} />
                    <Route path="drinks" element={<ChooseDrinks/>} />
                    <Route path="*" element={<Navigate to="/settings/product/management/hot/dishes"/>} />
                </Routes>
            </ProductInfiniteScrollWrapper>
        </div>
    )
}