import { useLayoutEffect, useState } from "react";
import { ProductCardBuilder } from "../ProductCardBuilder"

export const ChooseAppetizers = () =>{
    return(
        <div>
            <h4 className="px-3 px-ms-0">Choose Appetizers</h4>
            <ProductCardBuilder 
                defaultImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBRxZHy45MDxYoYuFCPD_ZkUSXa-CaiuY4sg&s"
            />
        </div>
    )
}