import { data } from "jquery";

export class Order{
    constructor(API){
        this.api = API;
    }

    async set(data){
        //id, status, hide=false
        return await this.api.get('/set/order', data);
    }

    async setToCart(data){
        //id, orderId, productId, price, note
        return await this.api.get('/set/to/cart', data);
    }

    async setDiscountToCart(data){
        //id, discountId, productId, orderId, amount, type, hide
        return await this.api.get('/set/discount/to/cart', data);
    }

    async list(data){
        //id=null, status=null, hide=false
        return await this.api.get('/list/orders', data);
    }
}
