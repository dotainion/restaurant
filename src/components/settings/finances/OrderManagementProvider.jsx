import { createContext, useContext, useState } from "react"

const Context = createContext();

export const useOrderManagement = () => useContext(Context);

export const OrderManagementProvider = ({children}) =>{
    const [refundedItems, setRefundedItems] = useState([]);

    const order = {
        id: 'ORD-20250619140852',
        date: '2025-06-19',
        customer: 'John Doe',
        status: 'Completed',
        payment: 'Credit Card',
        total: 120.00,
        items: [
            {id: 1, name: 'Grilled Chicken', price: 40.0, quantity: 1},
            {id: 2, name: 'Caesar Salad', price: 20.0, quantity: 2},
            {id: 3, name: 'Lemonade', price: 10.0, quantity: 2},
        ]
    };
    
    const refundAll = () => {
        setRefundedItems(sampleOrder.items.map(item => item.id));
    }

    const submitRefund = () => {
        const refunded = sampleOrder.items.filter(item => refundedItems.includes(item.id));
        console.log('Refunding:', refunded);
    }

    const toggleRefundItem = (itemId) => {
        setRefundedItems(prev =>
        prev.includes(itemId)
            ? prev.filter(id => id !== itemId)
            : [...prev, itemId]
        );
    }

    const values = {
        order,
        refundedItems,
        submitRefund,
        refundAll,
        toggleRefundItem
    }

    return(
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}