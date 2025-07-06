import { useState, useEffect } from "react"
import { ProductCardEditableBuilder } from "../../ProductCardEditableBuilder"

export const ChooseAppetizers = () =>{
    return(
        <div>
            <h4 className="px-3 px-ms-0">Choose Appetizers</h4>
            <ProductCardEditableBuilder 
                name="appetizer"
                defaultImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBRxZHy45MDxYoYuFCPD_ZkUSXa-CaiuY4sg&s"
            />
        </div>
    )
}