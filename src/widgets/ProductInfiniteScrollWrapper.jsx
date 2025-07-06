import { createContext, useContext, useState } from "react";
import { useUtils } from "../providers/UtilsProvider";
import { ProductInfiniteScroll } from "./ProductInfiniteScroll"

const Context = createContext();
export const useProductInfiniteScroll = () => useContext(Context);

export const ProductInfiniteScrollWrapper = ({targetScroll, header, baseRoute, children}) =>{
    const { infiniteScroll, navigateTo } = useUtils();
    
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchValue, setSearachValue] = useState(null);
    const [pageCategory, setPageCategory] = useState(null);
    const [observing, setObserving] = useState(true);
    const [offset, setOffset] = useState(0);

    const productCategoryChange = (category) =>{
        setObserving(false);
        setOffset(0);
        setProducts([]);
        setPageCategory(category.category);
        navigateTo(category.route);
    }
    
    const values = {
        searchValue,
        pageCategory,
        products,
        offset, 
        observing, 
        loading,
        setLoading,
        setObserving,
        setOffset,
        setProducts,
        setPageCategory,
        setSearachValue,
        productCategoryChange,
    }
    
    return (
        <Context.Provider value={values}>
            {infiniteScroll.state ? (
                <ProductInfiniteScroll targetScroll={targetScroll} header={header} baseRoute={baseRoute}>
                    {children}
                </ProductInfiniteScroll>
            ) : children}
            
        </Context.Provider>
    )
}