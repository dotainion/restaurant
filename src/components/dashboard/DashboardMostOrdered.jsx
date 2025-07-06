import { useEffect, useState } from "react"
import { api } from "../../request/Api";
import { Spinner } from "../../widgets/Spinner";
import { utils } from "../../utils/Utils";

export const DashboardMostOrdered = () =>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = (data) =>{
        setLoading(true);
        api.product.list(data).then((response)=>{
            setProducts(groupWithQuantity(response.data.data));
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }

    const groupWithQuantity = (items) =>{
        const map = new Map();
        for (const item of items) {
            const key = item.id;
            if (!map.has(key)) map.set(key, { ...item, quantity: 1 });
            else map.get(key).quantity++;
        }
        return Array.from(map.values());
    }
    
    const yesterday = () =>{
        const date = new Date();
        date.setMonth(date.getDay() -1);
        search({
            to: utils.date.endOfDay(date),
            from: utils.date.startOfDay(date)
        });
    }

    const today = () =>{
        search({
            to: utils.date.endOfDay(new Date()),
            from: utils.date.startOfDay(new Date())
        });
    }

    const change = (e) =>{
        if(e.target.value === 'today') return today();
        if(e.target.value === 'yesterday') return yesterday();
    }

    useEffect(()=>{
        today();
    }, []);

    return(
        <div className="bg-darker text-light rounded-3 p-3 mb-3 overflow-auto scrollbar-md position-relative">
            <div className="d-flex flex-wrap justify-content-between">
                <h5>Most Ordered</h5>
                <div>
                    <select onChange={change} className="form-control form-select bg-darker border border-secondary text-light shadow-none w-auto">
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                    </select>
                </div>
            </div>
            <hr></hr>
            {
                products.length ?
                products.map((product)=>(
                    <div className="d-flex flex-wrap align-items-center gap-3 mb-3" key={product.id}>
                        <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG3jTszSflQt-SjZGIWqJRegF0GrAVzpCQtg&s"
                            className="rounded-circle"
                            style={{
                                minWidth: '50px',
                                maxWidth: '50px',
                                minHeight: '50px',
                                maxHeight: '50px'
                            }}
                            alt="" 
                        />
                        <div>
                            <div>{product.attributes.name}</div>
                            <div className="small text-secondary">{product.quantity} dishes ordered</div>
                        </div>
                    </div>
                )):
                <div className="">
                    <div className="card text-light">
                        <div className="card-header bg-dark d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">📦 Most Ordered</h5>
                        </div>
                        <div className="card-body text-center text-muted py-5">
                            <img className="mb-4" src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" alt="No Orders" width="100" />
                            <h6>No Popular Items Yet</h6>
                            <p className="mb-3">Once customers start placing orders, the top-selling items will show up here.</p>
                        </div>
                    </div>
                </div>
            }
            <button className="btn btn-outline-orange border border-orange w-100">View All</button>
            <Spinner show={loading} inline />
        </div>
    )
}