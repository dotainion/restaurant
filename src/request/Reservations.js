export class Reservations{
    constructor(API){
        this.api = API;
    }

    async set(data){
        return await this.api.get('/set/reservation', data);
    }

    async list(data){
        return await this.api.get('/list/reservations', data);
    }
}

