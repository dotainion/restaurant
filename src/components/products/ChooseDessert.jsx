import { useState } from "react";
import { ProductCardBuilder } from "../ProductCardBuilder"

export const ChooseDessert = () =>{
    return(
        <div>
            <h4 className="px-3 px-ms-0">Choose Dessert</h4>
            <ProductCardBuilder 
                defaultImage="https://stordfkenticomedia.blob.core.windows.net/df-us/rms/media/recipesmedia/recipes/retail/x17/2003/feb/17244-caramel-topped-ice-cream-dessert-600x600.jpg?ext=.jpg"
            />
        </div>
    )
}