import { Navigate, Route, Routes } from "react-router-dom"
import { SettingsLayout } from "../layouts/SettingsLayout"
import { Restaurant } from "../components/settings/restaurant/Restaurant"
import { Security } from "../components/settings/Security/Security"
import { Notifications } from "../components/settings/notifications/Notifications"
import { Appearance } from "../components/settings/appearance/Appearance"
import { ProductManagementRouter } from "./ProductManagementRouter"
import { FinanceRouter } from "./FinanceRouter"
import { Orders } from "../components/settings/orders/Orders"
import { ViewOrder } from "../components/settings/orders/ViewOrder"
import { ProfileLayout } from "../layouts/ProfileLayout"

export const SettingsRouter = () =>{
    return(
        <SettingsLayout>
            <Routes>
                <Route path="product/management/*" element={<ProductManagementRouter/>} />
                <Route path="restaurant" element={<Restaurant/>} />
                <Route path="security" element={<Security/>} />
                <Route path="notifications" element={<Notifications/>} />
                <Route path="appearance" element={<Appearance/>} />
                <Route path="finance/*" element={<FinanceRouter/>} />
                <Route path="orders" element={<Orders/>} />
                <Route path="view/order/:orderId" element={<ViewOrder/>} />
                <Route path="profile/*" element={<ProfileLayout/>} />
                <Route path="*" element={<Navigate to="/settings/product/management"/>} />
            </Routes>
        </SettingsLayout>
    )
}