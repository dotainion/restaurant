class Content{
    titleCase(str){
        return str
            .toLowerCase()
            .split(' ')
            .map(word => {
                if (word.length === 0) return '';
                return word[0].toUpperCase() + word.slice(1);
            })
            .join(' ');
    }
}

class DateTime{
    dbFormat(dateInstance){
        if(!dateInstance) return '';
        dateInstance = this.toFull(dateInstance);
        dateInstance = new Date(this.fd(dateInstance));
        
        const year = dateInstance.getFullYear();
        const month = String(dateInstance.getMonth() + 1).padStart(2, '0');
        const day = String(dateInstance.getDate()).padStart(2, '0');
        const hours = String(dateInstance.getHours()).padStart(2, '0');
        const minutes = String(dateInstance.getMinutes()).padStart(2, '0');
        const seconds = String(dateInstance.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    toLocalTime(dateInstance){
        if(!dateInstance) return '';
        return new Date(this.fd(dateInstance)).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    toLocalDate(dateInstance){
        if(!dateInstance) return '';
        return new Date(this.fd(dateInstance)).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
    }

    toLocalDateTime(dateInstance){
        if(!dateInstance) return '';
        return `${this.toLocalDate(dateInstance)} ${this.toLocalTime(dateInstance)}`;
    }

    bindFromInputValue(dateValue, timeValue){
        timeValue = this.ensureSeconds(timeValue);
        return new Date(`${dateValue.trim()}T${timeValue}`);
    }

    to2D(num){
        if(num.length === 1) return `0${num}`;
        return num;
    }

    fd(dateInstance){
        if(typeof dateInstance === 'string'){
            return dateInstance.replace(' ', 'T');
        }
        return dateInstance;
    }

    toFull(dateInstance){
        if(typeof dateInstance === 'string'){
            const parts = dateInstance.split(' ');
            if(parts.length > 1) return `${parts} 00:00:00`;
        }
        return dateInstance;
    }

    startOfDay(dateInstance) {
        const date = new Date(this.fd(dateInstance));
        date.setHours(0, 0, 0, 0);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    endOfDay(dateInstance) {
        const date = new Date(this.fd(dateInstance));
        date.setHours(23, 59, 59, 999);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    ensureSeconds(input, seconds = '00') {
        if(typeof input !== 'string') return input;
        if(input.includes(' ')){
            const [date, time] = input.split(' ');
            const timeParts = time.split(':');
            if (timeParts.length === 3) return input;
            else if (timeParts.length === 2) return `${date} ${time}:${seconds}`;
        }else{
            const timeParts = input.split(':');
            if (timeParts.length === 3) return input;
            else if (timeParts.length === 2) return `${input}:${seconds}`;
        }
        return null;
    }
}

class Utils{
    date;
    text;
    
    constructor(){
        this.date = new DateTime();
        this.text = new Content();
    }
    randomColor = () =>{
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

export const utils = new Utils();