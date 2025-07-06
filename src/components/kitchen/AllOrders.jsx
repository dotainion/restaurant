import { KitchenCardBuilder } from "./KitchenCardBuilder";
import { MdListAlt, MdSearchOff } from "react-icons/md";
import { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { Spinner } from "../../widgets/Spinner";
import { KitchenFilter } from "./KitchenFilter";
import { STATUS } from "../../contents/Products";

export const AllOrders = () =>{
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState({});
    const [loading, setLoading] = useState(false);

    const loadOrders = () =>{
        if(!filter?.to || !filter?.from) return;
        setOrders([]);
        setLoading(true);
        api.order.list({
            ...filter, 
            status: [
                STATUS.kitchen, 
                STATUS.preparing, 
                STATUS.ready
            ]
        }).then((response)=>{
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
                title="View all orders"
                icon={<MdListAlt className="fs-1" />}
                reload={loadOrders}
                search={setFilter}
            />
            <KitchenCardBuilder orders={orders} onRemove={(order)=>setOrders((ords)=>ords.map((or)=>or.id === order.id ? order : or))}>
                {!loading && !orders.length && (
                    <div className="text-center py-5">
                        <div className="d-flex text-light justify-content-center">
                            <div className="col-md-6">
                                <div className="mb-4">
                                    <MdSearchOff size={64}/>
                                </div>
                                <h4>No Orders Found</h4>
                                <p>There are currently no <strong>pending</strong>, <strong>preparing</strong>, or <strong>ready</strong> orders.</p>
                            </div>
                        </div>
                    </div>
                )}
            </KitchenCardBuilder>
            <Spinner inline transparent show={loading} />
        </div>
    )
}