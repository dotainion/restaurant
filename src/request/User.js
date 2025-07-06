export class User{
    constructor(API){
        this.api = API;
    }

    async editProfile(data){
        return await this.api.get('/edit/user', data);
    }

    async user(id){
        return await this.api.get('/fetch/user', {id});
    }

    async users(){
        return await this.api.get('/list/users', null);
    }

    async search(data){
        return await this.api.get('/search/users', data);
    }

    async address(id){
        return await this.api.get('/fetch/address', {id});
    }

    async setAddress(data){
        return await this.api.get('/set/address', data);
    }

    async setRole(data){
        return await this.api.get('/set/role', data);
    }

    async listRoles(data){
        return await this.api.get('/list/roles', data);
    }

    async assignRole(userId, roleId){
        return await this.api.get('/assign/role', {userId, roleId});
    }
}
