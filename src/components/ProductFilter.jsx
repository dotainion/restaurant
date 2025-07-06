import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { CATEGORY } from "../contents/Products";
import { useProductInfiniteScroll } from "../widgets/ProductInfiniteScrollWrapper";

export const ProductFilter = ({baseRoute}) =>{
    const { productCategoryChange, setPageCategory } = useProductInfiniteScroll();

    const location = useLocation();

    const locationRef = useRef();

    const isActive = (cat) =>{
        if(location.pathname === cat.route) return 'border-bottom border-orange';
        return '';
    }

    const to = (cat) =>{
        if(location.pathname === cat.route) return;
        productCategoryChange(cat);
    }

    const categories = [
        {title: 'Hot Dishes', route: `${baseRoute}/hot/dishes`, category: CATEGORY.hotDishes},
        {title: 'Cold Dishes', route: `${baseRoute}/cold/dishes`, category: CATEGORY.coldDishes},
        {title: 'Soup', route: `${baseRoute}/soups`, category: CATEGORY.soup},
        {title: 'Grill', route: `${baseRoute}/grills`, category: CATEGORY.grill},
        {title: 'Appetizer', route: `${baseRoute}/appetizers`, category: CATEGORY.appetizer},
        {title: 'Dessert', route: `${baseRoute}/desserts`, category: CATEGORY.dessert},
        {title: 'Cocktails', route: `${baseRoute}/cocktails`, category: CATEGORY.cocktails},
        {title: 'Drinks', route: `${baseRoute}/drinks`, category: CATEGORY.drinks},
    ];
    
    useEffect(()=>{
        const category = categories.find((cat)=>location.pathname.includes(cat.route));
        if(!category || location.pathname.split('/')[1] === locationRef.current) return;
        locationRef.current = location.pathname.split('/')[1];
        setPageCategory(category.category);
    }, [location]);

    return(
        <div className="d-flex flex-wrap gap-3 mt-2">
            {categories.map((cat)=>(
                <button 
                    onClick={()=>to(cat)} 
                    className={`btn rounded-0 border-0 text-light px-0 mx-2 ${isActive(cat)}`}
                    key={cat.title}
                >{cat.title}</button>
            ))}
        </div>
    )
}