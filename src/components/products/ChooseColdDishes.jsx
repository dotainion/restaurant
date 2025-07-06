import { useState } from "react";
import { ProductCardBuilder } from "../ProductCardBuilder"

export const ChooseColdDishes = () =>{
    return(
        <div>
            <h4 className="px-3 px-ms-0">Choose Cold Dishes</h4>
            <ProductCardBuilder 
                defaultImage="https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/prawn_and_pineapple_43260_16x9.jpg"
            />
        </div>
    )
}