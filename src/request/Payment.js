export class Payment{
    constructor(API){
        this.api = API;
    }

    async create(data){
        return await this.api.get('/create/payment', data);
    }

    async list(data){
        return await this.api.get('/list/payment', data);
    }
}

