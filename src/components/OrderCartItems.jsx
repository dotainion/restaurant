import { Fragment, useState } from "react"
import { useOrder } from "../providers/OrderProvider";
import { CartItemError } from "./CartItemError";
import { CartItemDelete } from "./CartItemDelete";
import { AiOutlineTags } from "react-icons/ai";
import { DISCOUNT_TYPE } from "../contents/Discounts";
import { CartItemNote } from "./CartItemNote";

export const OrderCartItems = () =>{
    const { orders, updateQantity, subTotal, discountTotal } = useOrder();
    return(
        <Fragment>
            <hr className="mt-0"></hr>
            <div className="overflow-y-auto overflow-x-hidden scrollbar-md mb-auto px-4 py-3">
                {orders.map((product, key)=>(
                    <Fragment key={`cart-items-${product.itemId}-${key}-value`}>
                        {
                            product.type.includes('discount')
                            ?<div className="mb-4">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <AiOutlineTags className="fs-1"/>
                                    <div>
                                        <div>{product.attributes.title}</div>
                                        <div className="d-flex">
                                            <div className="me-2">Price:</div>
                                            {product.attributes.type === DISCOUNT_TYPE.fixedAmount && (
                                                <div className="fw-semibold">$</div>
                                            )}
                                            <div className="fw-semibold">{product.attributes.amount}</div>
                                            {product.attributes.type === DISCOUNT_TYPE.percentage && (
                                                <div className="fw-semibold">%</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <CartItemNote item={product} />
                                    <CartItemDelete item={product} />
                                </div>
                                <CartItemError item={product} />
                            </div>
                            :<div data-cart-item={product.itemId}>
                                <div className="d-flex gap-2 w-100">
                                    <div className="flex-fill d-flex gap-2 w-100 overflow-hidden">
                                        <img className="cart-col-size rounded-circle" src="https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg" alt=""/>
                                        <div className="text-truncate">
                                            <div className="text-truncate" title={product.attributes.name}>{product.attributes.name}</div>
                                            <div className="text-truncate small text-secondary">${product.attributes.price}</div>
                                        </div>
                                    </div>
                                    <input 
                                        className="bg-dark rounded-3 cart-col-size text-center text-light"
                                        onChange={(e)=>updateQantity(product, e.target.value)}
                                        value={product.quantity}
                                    />
                                    <div className="d-flex align-items-center text-truncate cart-col-size small">
                                        <div className="text-truncate small" title={product.attributes.price}>${product.attributes.price}</div>
                                    </div>
                                </div>
                                <div className="mt-2 mb-4">
                                    <div className="d-flex gap-2">
                                        <CartItemNote item={product} />
                                        <CartItemDelete item={product} />
                                    </div>
                                    <CartItemError item={product} />
                                </div>
                            </div>
                        }
                        
                    </Fragment>
                ))}
            </div>
            <hr className="m-0"></hr>
            <div className="px-4 pt-3 pb-2">
                <div className="d-flex">
                    <div className="flex-fill text-secondary">Discount</div>
                    <div className="text-nowrap">${discountTotal.toFixed(2)}</div>
                </div>
                <div className="d-flex mb-3">
                    <div className="flex-fill text-secondary">Sub total</div>
                    <div className="text-nowrap">${subTotal.toFixed(2)}</div>
                </div>
            </div>
        </Fragment>
    )
}