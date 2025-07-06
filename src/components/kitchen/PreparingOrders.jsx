import { KitchenCardBuilder } from "./KitchenCardBuilder";
import { GiCook } from "react-icons/gi";
import { api } from "../../request/Api";
import { useEffect, useState } from "react";
import { MdOutlineKitchen } from "react-icons/md";
import { Spinner } from "../../widgets/Spinner";
import { KitchenFilter } from "./KitchenFilter";
import { STATUS } from "../../contents/Products";

export const PreparingOrders = () =>{
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState({});
    const [loading, setLoading] = useState(false);

    const loadOrders = () =>{
        if(!filter?.to || !filter?.from) return;
        setOrders([]);
        setLoading(true);
        api.order.list({...filter, status: STATUS.preparing}).then((response)=>{
            setOrders(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }
    
    useEffect(()=>{
        loadOrders();
    }, [filter]);

    return(
        <div className="d-flex flex-column h-100 w-100 position-relative">
            <KitchenFilter
                title="View preparing orders"
                icon={<GiCook className="fs-1" />}
                reload={loadOrders}
                search={setFilter}
            />
            <KitchenCardBuilder orders={orders} onRemove={(order)=>setOrders((ords)=>ords.filter((or)=>or.id !== order.id))}>
                {!loading && !orders.length && (
                    <div className="text-center py-5">
                        <div className="d-flex text-light justify-content-center">
                            <div className="col-md-6">
                                <div className="mb-4">
                                    <MdOutlineKitchen size={64}/>
                                </div>
                                <h4>No Preparing Orders</h4>
                                <p>Once an order is marked as <strong>"Preparing"</strong>, it will show up here.</p>
                            </div>
                        </div>
                    </div>
                )}
            </KitchenCardBuilder>
            <Spinner inline transparent show={loading} />
        </div>
    )
}