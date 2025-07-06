import { Fragment } from "react"
import { IoIosSearch } from "react-icons/io";
import { ProductFilter } from "./ProductFilter";
import { FiShoppingCart } from "react-icons/fi";
import { DateDisplay } from "./DateDisplay";
import { useUtils } from "../providers/UtilsProvider";
import { useProductInfiniteScroll } from "../widgets/ProductInfiniteScrollWrapper";

export const OrderSearchFilter = ({header, baseRoute}) =>{
    const { cartUtils } = useUtils();
    const { setSearachValue, setProducts, setOffset } = useProductInfiniteScroll();

    const onSearch = (e) =>{
        setOffset(0);
        setProducts([]);
        setTimeout(() => {
            setSearachValue(e.target.value);
        }, 0);
    }

    return(
        <Fragment>
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 w-100 px-sm-2">
                <div className="">
                    <h5>{header}</h5>
                    <DateDisplay />
                </div>
                <div className="search d-flex align-items-center rounded-2 px-1">
                    <IoIosSearch className="text-light fs-2"/>
                    <input 
                        onChange={onSearch}
                        className="form-control border-0 shadow-none bg-transparent text-light ps-1" 
                        placeholder="Search for food, coffe, etc..."
                    />
                </div>
                <button onClick={cartUtils.show} className="d-md-none btn border border-lightly">
                    <FiShoppingCart className="text-orange fs-4"/>
                </button>
            </div>
            <ProductFilter baseRoute={baseRoute}/>
        </Fragment>
    )
}