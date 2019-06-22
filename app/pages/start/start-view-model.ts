import { Observable } from "tns-core-modules/ui/page/page";
const firebase = require("nativescript-plugin-firebase");


export class StartViewModel extends Observable{

    constructor(){
        super();
    }

    public userLogin(email: string, password: string)
    {
        firebase.login(
            {
              type: firebase.LoginType.PASSWORD,
              passwordOptions: {
                email:'admin@rps.com',
                password: 'zaks123'
              }
            })
            .then(result => {
                console.log(JSON.stringify(result));
            })
            .catch(error => console.log(error));

    }
}