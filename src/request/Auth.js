import { token } from "../utils/Token";

export class Auth{
    constructor(API){
        this.api = API;
    }

    async logout(){
        return await this.api.post('/logout', null);
    }

    async signIn(email, password){
        return await this.api.post('/signin', {email, password});
    }

    async pinSignIn(pin){
        return await this.api.post('/pin/signin', {pin});
    }

    async createPinSignIn(id, pin){
        return await this.api.post('/create/pin/credential', {id, pin});
    }

    async changePassword(id, password, currentPassword){
        return await this.api.post('/update/credential', {id, password, currentPassword});
    }

    async recovery(email){
        return await this.api.post('/recover/account', {email});
    }

    async signUp(data){
        return await this.api.post('/create/user', data);
    }

    async session(){
        return await this.api.get('/fetch/session', {token: token.get()});
    }

    async assignRestaurantToSession(restaurantId){
        return await this.api.get('/assign/to/session', {restaurantId});
    }

    async authVerification(email, password){
        return await this.api.get('/auth/verification', {email, password});
    }
}
