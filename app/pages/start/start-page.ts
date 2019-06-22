import { StartViewModel } from "./start-view-model";
import { EventData, Page } from "tns-core-modules/ui/page/page";
import * as navigationModule from "~/shared/navigation";
const firebase = require("nativescript-plugin-firebase");


var vm:StartViewModel;
var page;

export function onPageLoaded(args: EventData) {
   
    page= <Page>args.object;
    vm= new StartViewModel();
    page.bindingContext = vm;
}

export function mLogin(args: EventData){

    var txtUsername = <any>page.getViewById('txtUsername');
    var txtPassword = <any>page.getViewById('txtPassword');

    firebase.login(
        {
          type: firebase.LoginType.PASSWORD,
          passwordOptions: {
            email: 'admin@rps.com',
            password: 'zaks123'
          }
        })
        .then(result => {
            // console.log(JSON.stringify(result));
            navigationModule.gotoAdminPage();

        })
        .catch(error => console.log(error));

        
}
export function userLogin(args:EventData){
    var txtUsername = <any>page.getViewById('txtUsername');
    var txtPassword = <any>page.getViewById('txtPassword');
    vm.userLogin(txtUsername.text,txtPassword.text);
    navigationModule.gotoMainPage();
}