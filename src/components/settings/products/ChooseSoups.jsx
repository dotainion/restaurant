import { useState, useEffect } from "react";
import { ProductCardEditableBuilder } from "../../ProductCardEditableBuilder"

export const ChooseSoups = () =>{
    return(
        <div>
            <h4 className="px-3 px-ms-0">Choose Soups</h4>
            <ProductCardEditableBuilder
                name="soup" 
                defaultImage="https://www.thespruceeats.com/thmb/lko3xX8clhOrC894t9Drb6MoiX0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/easy-and-hearty-vegetable-soup-99538-hero-01-1d3b936ff03144af95ddca7640259c11.jpg"
            />
        </div>
    )
}