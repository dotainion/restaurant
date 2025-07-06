import { useOrder } from "../providers/OrderProvider"
import { useProductInfiniteScroll } from "../widgets/ProductInfiniteScrollWrapper";

export const ProductCardBuilder = ({defaultImage}) =>{
    const { addProduct } = useOrder();
    const { products } = useProductInfiniteScroll();
    return(
        <div className="d-flex flex-wrap px-0 mt-3">
            {products.map((product)=>(
                <div className="col-12 col-lg-6 col-xl-4 col-xxl-3 p-2" key={product.id} style={{minWidth: '178px'}}>
                    <div onClick={()=>addProduct(product)} className="d-flex flex-column bg-darker rounded-4 text-center pointer p-3 h-100 user-select-none">
                        <div className="mb-auto">
                            <img 
                                className="rounded-circle" 
                                src={defaultImage}
                                alt=""
                                style={{
                                    minWidth: '130px', 
                                    maxWidth: '130px', 
                                    minHeight: '130px', 
                                    maxHeight: '130px',
                                }}
                            />
                            <div className="mt-3 text-break">{product.attributes.name}</div>
                            <div className="text-orange text-break my-1">${product.attributes.price}</div>
                        </div>
                        <div className="text-secondary text-break">{product.attributes.description}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}