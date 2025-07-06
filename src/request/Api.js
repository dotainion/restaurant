import axios from "axios";
import { token } from "../utils/Token";
import { Auth } from "./Auth";
import { User } from "./User";
import { Messages } from "./Messages";
import { Payment } from "./Payment";
import { Email } from "./Email";
import { Products } from "./Products";
import { Order } from "./Order";
import { Reservations } from "./Reservations";
import { Restaurant } from "./Restaurant";
import { Discount } from "./Discount";

export class Api{
    option = {};
    baseURL;
    sessionURL = '/fetch/session';
    notAuthenticatedCallback = [];

    constructor(){
        this.initialize();
        this.axios = axios.create({
            baseURL: this.baseURL,
            headers: {
                Authorization: token.get(),
                Accept: 'application/json',
                AccessPath: window.location.pathname
            }
        });
        this.user = new User(this);
        this.auth = new Auth(this);
        this.message = new Messages(this);
        this.payment = new Payment(this);
        this.mail = new Email(this);
        this.product = new Products(this);
        this.order = new Order(this);
        this.reservation = new Reservations(this);
        this.restaurant = new Restaurant(this);
        this.discount = new Discount(this);
    }

    setOption(option){
        this.option = option;
    }

    setNotAuthenticatedCallback(callback){
        this.notAuthenticatedCallback.push(callback);
    }

    initialize(){
        if(process.env.NODE_ENV === 'development'){
            this.baseURL = 'https://www.caribbeancodingacademygrenada.com/restaurant-service';
        }else if(process.env.NODE_ENV === 'production'){
            this.baseURL = '/restaurant-service';
        }else{
            console.error('Environment not determined.');
        }
    }

    reInitializeAuthorizationHeader(){
        this.axios.defaults.headers.Authorization = token.get();
    }

    parseError(error){
        if(error.status === 401){
            this.notAuthenticatedCallback.forEach((callback)=>callback(error.status));
        }
        throw error;
    }

    async post(route, data){
        try{
            data = {...data, ...this.option};
            return await this.axios.post(route, data);
        }catch(error){
            return this.parseError(error);
        }
    }

    async get(route, data){
        try{
            data = {...data, ...this.option};
            return await this.axios.post(route, data);
        }catch(error){
            return this.parseError(error);
        }
    }
}

export const api = new Api();
