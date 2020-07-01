export class User {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string

    constructor(fn: string, ln: string, username: string, email:string, password: string){
        this.first_name = fn;
        this.last_name = ln;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    hello(){
        console.log("Welcome " + this.username);
        
    }
}

export class PUser {
    user: User;
    address: string;
    phone: string;

    constructor(user: User, address: string, phone: string){
        this.user = user;
        this.address = address;
        this.phone = phone;
    }
}


