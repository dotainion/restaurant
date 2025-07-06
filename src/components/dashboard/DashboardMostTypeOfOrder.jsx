import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { api } from '../../request/Api';
import { utils } from '../../utils/Utils';
import { Spinner } from '../../widgets/Spinner';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DashboardMostTypeOfOrder = () =>{
    const [stats, setStats] = useState({dineIn: 0, toGo: 0, delivery: 0});
    const [loading, setLoading] = useState(false);

    const data = {
        labels: ['Blue', 'Orange', 'Pink'],
        datasets: [
        {
            label: 'Inner Ring',
            data: [100, 0, 0],
            backgroundColor: ['blue', 'transparent', 'transparent'],
            cutout: '75%',
            borderWidth: 0,
        },{
            label: 'Middle Ring',
            data: [0, 100, 0],
            backgroundColor: ['transparent', 'orange', 'transparent'],
            cutout: '50%',
            borderWidth: 0,
        },{
            label: 'Outer Ring',
            data: [0, 0, 100],
            backgroundColor: ['transparent', 'transparent', 'pink'],
            cutout: '25%',
            borderWidth: 0,
        }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    }

    const w = 20;
    const bullitin = {
        minWidth: `${w}px`, 
        minHeight: `${w}px`, 
        maxWidth: `${w}px`, 
        maxHeight: `${w}px`, 
        backgroundColor: 'blue',
        marginTop: '5px'
    }

    const search = (data) =>{
        setLoading(true);
        api.order.list(data).then((response)=>{
            setStats({
                dineIn: response.data.data.filter(order=>order.attributes.preference === 'dine-in').length,
                toGo: response.data.data.filter(order=>order.attributes.preference === 'to-go').length,
                delivery: response.data.data.filter(order=>order.attributes.preference === 'delivery').length
            });
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }

    const yesterday = () =>{
        const date = new Date();
        date.setMonth(date.getDay() -1);
        search({
            from: utils.date.startOfDay(date),
            to: utils.date.endOfDay(date)
        });
    }

    const today = () =>{
        search({
            from: utils.date.startOfDay(new Date()),
            to: utils.date.endOfDay(new Date())
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
        <div className="bg-darker text-light rounded-3 p-3 position-relative">
            <div className="d-flex flex-wrap justify-content-between">
                <h5>Most Type of Order</h5>
                <div>
                    <select onChange={change} className="form-control form-select bg-darker border border-secondary text-light shadow-none w-auto">
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                    </select>
                </div>
            </div>
            <div className="mt-3">
                <div className="d-flex flex-wrap gap-2 flex-wrap">
                    <div className="d-flex gap-2">
                        <div className="rounded-circle" style={{...bullitin, backgroundColor: 'blue'}}/>
                        <div>
                            <div>Dine In</div>
                            <div>{stats.dineIn} customers</div>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <div className="rounded-circle" style={{...bullitin, backgroundColor: 'orange'}}/>
                        <div>
                            <div>To Go</div>
                            <div>{stats.toGo} customers</div>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <div className="rounded-circle" style={{...bullitin, backgroundColor: 'pink'}}/>
                        <div>
                            <div>Delivery</div>
                            <div>{stats.delivery} customers</div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <Doughnut data={data} options={options} />
                </div>
            </div>
            <Spinner show={loading} inline />
        </div>
    )
}