import { Observable } from "tns-core-modules/ui/page/page";
const firebase = require("nativescript-plugin-firebase");
import * as navigationModule from "~/shared/navigation";


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
                email:email,
                password: password
              }
            })
            .then(result => {
                console.log(JSON.stringify(result));
                navigationModule.gotoMainPage();
            })
            .catch(error => console.log(error));

    }
}