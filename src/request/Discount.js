import { data } from "jquery";

export class Discount{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.get('/set/discounts', data);
    }

    async link(data){
        //productId, discountId
        return await this.api.get('/link/discount/to/product', data);
    }

    async list(data){
        return await this.api.get('/list/discounts', data);
    }
}
