import { useEffect, useState } from "react";
import { ProductCardEditableBuilder } from "../../ProductCardEditableBuilder"

export const ChooseHotDishes = () =>{
    return(
        <div>
            <h4 className="px-3 px-ms-0">Choose Hot Dishes</h4>
            <ProductCardEditableBuilder
                name="hot dish" 
                defaultImage="https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg"
            />
        </div>
    )
}