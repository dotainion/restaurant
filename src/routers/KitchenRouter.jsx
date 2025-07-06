import { Navigate, Route, Routes } from "react-router-dom"
import { PendingOrders } from "../components/kitchen/PendingOrders"
import { PreparingOrders } from "../components/kitchen/PreparingOrders"
import { ReadyOrders } from "../components/kitchen/ReadyOrders"
import { AllOrders } from "../components/kitchen/AllOrders"
import { ViewOrder } from "../components/kitchen/ViewOrder"

export const KitchenRouter = () =>{
    return(
        <Routes>
            <Route path="pending" element={<PendingOrders/>} />
            <Route path="preparing" element={<PreparingOrders/>} />
            <Route path="ready" element={<ReadyOrders/>} />
            <Route path="all" element={<AllOrders/>} />
            <Route path="view/:orderId" element={<ViewOrder/>} />
            <Route path="*" element={<Navigate to="all"/>} />
        </Routes>
    )
}