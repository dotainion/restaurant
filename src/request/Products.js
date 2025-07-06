export class Products{
    constructor(API){
        this.api = API;
    }

    async list(data){
        return await this.api.get('/list/products', data);
    }

    async set(data){
        return await this.api.get('/set/product', data);
    }
}
