import { useState } from "react";
import { ProductCardBuilder } from "../ProductCardBuilder"

export const ChooseCocktails = () =>{
    return(
        <div>
            <h4 className="px-3 px-ms-0">Choose Cocktails</h4>
            <ProductCardBuilder 
                defaultImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv--1V2lC_lbBYKLohiCq4-_4UAe3pn0tTKA&s"
            />
        </div>
    )
}