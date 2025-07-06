import { Fragment, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoAddSharp } from "react-icons/io5";
import { SetProductOverlay } from "./SetProductOverlay";
import { useProductInfiniteScroll } from "../widgets/ProductInfiniteScrollWrapper";

export const ProductCardEditableBuilder = ({defaultImage, name}) =>{
    const { products } = useProductInfiniteScroll();

    const [overlay, setShow] = useState({product: null, show: false});

    const imageSize = 130;

    return(
        <Fragment>
            <div className="row mt-3 px-2">
                <div className="col-12 col-lg-6 col-xl-4 col-xxl-3 p-2" style={{minHeight: '250px'}}>
                    <div onClick={()=>setShow({product: null, show: true})} className="h-100 user-select-none">
                        <div className="bg-darker rounded-4 text-center border border-dash-orange pt-0 pointer h-100">
                            <div className="d-flex align-items-center justify-content-center h-100 p-3">
                                <div className="text-orange">
                                    <IoAddSharp className="fs-1"/>
                                    <div className="mt-3">Add new {name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {products.map((product)=>(
                    <div className="col-12 col-lg-6 col-xl-4 col-xxl-3 p-2" key={product.id}>
                        <div className="h-100 user-select-none">
                            <div className="d-flex flex-column bg-darker rounded-4 text-center border border-dark pt-0 h-100">
                                <div className="p-3 mb-auto">
                                    <img 
                                        className="rounded-circle" 
                                        src={defaultImage}
                                        alt=""
                                        style={{
                                            minWidth: `${imageSize}px`, 
                                            maxWidth: `${imageSize}px`, 
                                            minHeight: `${imageSize}px`, 
                                            maxHeight: `${imageSize}px`,
                                        }}
                                    />
                                    <div className="mt-3 text-break">{product.attributes.name}</div>
                                    <div className="text-orange my-1 text-break">${product.attributes.price}</div>
                                    <div className="text-secondary text-break">{product.attributes.description}</div>
                                </div>
                                <button onClick={()=>setShow({product, show: true})} className="btn btn-orange bg-opacity-25 rounded-top-0 rounded-bottom-4 w-100">
                                    <CiEdit className="text-orange me-2"/>
                                    <span className="text-orange">Edit {name}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <SetProductOverlay 
                show={overlay.show} 
                productToEdit={overlay.product} 
                close={()=>setShow({product: null, show: false})} 
                defaultImage={defaultImage} 
            />
        </Fragment>
    )
}