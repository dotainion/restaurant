export class Restaurant{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.get('/set/restaurant', data);
    }

    async list(data){
        return await this.api.get('/list/restaurants', data);
    }
}
