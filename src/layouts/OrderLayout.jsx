import { OrderRouter } from "../routers/OrderRouter"
import { ProductInfiniteScrollWrapper } from "../widgets/ProductInfiniteScrollWrapper"

export const OrderLayout = ({children}) =>{
    return(
        <div className="d-flex vh-100">
            <div className="d-flex flex-column flex-fill py-4 px-xl-4">
                <ProductInfiniteScrollWrapper header="Restaurant Management System" baseRoute="/home">
                    <OrderRouter/>
                </ProductInfiniteScrollWrapper>
            </div>
            {children}
        </div>
    )
}