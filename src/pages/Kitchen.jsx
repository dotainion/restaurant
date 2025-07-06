import { KitchenRouter } from "../routers/KitchenRouter";
import { KitchenLayout } from "../layouts/KitchenLayout";

export const Kitchen = () =>{
    return(
        <KitchenLayout>
            <KitchenRouter />
        </KitchenLayout>
    )
}