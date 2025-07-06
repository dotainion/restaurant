import { useState, useEffect } from "react";
import { ProductCardEditableBuilder } from "../../ProductCardEditableBuilder"

export const ChooseDrinks = () =>{
    return(
        <div>
            <h4 className="px-3 px-ms-0">Choose Drinks</h4>
            <ProductCardEditableBuilder
                name="drink" 
                defaultImage="https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-802667754.jpg?c=16x9&q=h_833,w_1480,c_fill"
            />
        </div>
    )
}