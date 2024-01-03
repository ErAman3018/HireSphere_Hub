export default class UserModal{
    constructor(id,name,email,password){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
    }

    static addUser(name,email,password){
        const newUser = new UserModal(users.length+1,name,email,password);
        users.push(newUser);
    }

    static isValidUser(email,password){
        const findUser=users.find((u)=>u.email==email && u.password===password);
        return findUser===undefined?false:true;
    }

    static getUser(email){
        return users.find((p)=>p.email==email);
    }
}

var users=[];