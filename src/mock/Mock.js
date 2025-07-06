import { utils } from "../utils/Utils";
import { v4 as uuidv4 } from "uuid";

class MockData{
    user(){
        const firstName = this.randomName(0);
        const lastName = this.randomName(1);
        return{
            id: uuidv4(),
            attributes:{
                foreignId: null,
                firstName: firstName,
                lastName: lastName,
                fullName: `${firstName} ${lastName}`,
                email: 'example@example.com',
                hide: false,
                date: '2024-11-01 12:14:01',
                token: null,
                phoneNumber: '1473 459 8999',
                picture: null,
                addressId: null,
                address: this.address(),
                bio: 'MAS means More in Spanish, so MAS Global’s name reflects our mission to create education opportunities for women and Latinos in tech',
                gender: 'Male',
                role: {
                    attributes: {
                        role: 'admin',
                        read: true,
                        write: true,
                        edit: true,
                        delete: true
                    }
                }
            }
        }
    }

    randomName(type){
        const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Riley", "Casey", "Jamie", "Cameron", "Drew", "Skyler"];
        const lastNames = ["Smith", "Johnson", "Lee", "Brown", "Davis", "Miller", "Wilson", "Clark", "Lewis", "Young"];
        const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
        if(type === 0) return randomFirst;
        const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];
        if(type === 1) return randomLast;
        return `${randomFirst} ${randomLast}`;
    }

    address(){
        return{
            id: uuidv4(),
            attributes: {
                country: 'Grenada',
                state: 'St. Georges',
                address: 'Tempe',
                apt: '2',
                zip: '0000',
            }
        }
    }

    members(qty=15){
        return [...Array(qty)].map(()=>(this.user()));
    }

    message(){
        return{
            id: uuidv4(),
            attributes: {
                fromId:  uuidv4(),
                toId:  uuidv4(),
                date: utils.date.dbFormat(new Date()),
                message: 'Hello world',
                read: false,
                hide: false,
                user: this.user(),
            }
        }
    }

    messages(qty=30){
        return [...Array(qty)].map(()=>this.message());
    }

    messanger(){
        return{
            id: uuidv4(),
            attributes: {
                messages: this.messages(),
                user: this.user(),
                latestDate: utils.date.dbFormat(new Date()),
                latestMessage: 'Some latest message',
                quantity: 5,
            }
        }
    }

    messangers(qty=15){
        return [...Array(qty)].map(()=>this.messanger());
    }

    product(){
        return{
            id: uuidv4(),
            attributes: {
                name: '',
                price: 254,
                description: '',
                category: '',
                image: ''
            }
        }
    }
}

export const mock = new MockData();