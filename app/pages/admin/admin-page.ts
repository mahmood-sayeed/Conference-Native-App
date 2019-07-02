import { AdminViewModel } from "./admin-view-model";
import { EventData, Page, NavigatedData } from "tns-core-modules/ui/page/page";
import * as navigationModule from "~/shared/navigation";
import { SessionService } from "~/services/sessions-service";
import { Session, Speaker, RoomInfo } from "~/shared/interfaces";
import { genereateSpeakers } from "~/services/fake-data-service";
import * as animationHelperModule from "~/shared/animation-helper";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { Button } from "tns-core-modules/ui/button/button";
import { SessionViewModel } from "../session-page/session-view-model";
import { ItemEventData } from "tns-core-modules/ui/list-view/list-view";




const firebase = require("nativescript-plugin-firebase");

var vm:AdminViewModel;
var SIDE_DRAWER_ID = 'SideDrawer';
var page;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onPageLoaded(args: EventData) {
    page= <Page>args.object;
    // vm= new AdminViewModel();

    // page.bindingContext = vm;
    // vm.init();
}
export function pageNavigatingTo(args: NavigatedData) {   
    page= <Page>args.object;
    vm=new AdminViewModel();
    page.bindingContext = vm;
    vm.init();    
}


export function selectView(args: EventData) {
    var btn = <Button>args.object;
    var slideBar = <any>page.getViewById(SIDE_DRAWER_ID);
    slideBar.closeDrawer();

    vm.selectView(parseInt((<any>btn).tag), btn.text);
}

export function showSlideout(args: GestureEventData) {
    var slideBar = <any>page.getViewById(SIDE_DRAWER_ID);
    slideBar.showDrawer();
}


export function editRoom(args: ItemEventData) {
    var room = <RoomInfo>args.view.bindingContext;

    navigationModule.gotoRoomPage(room);
}

export function editSpeaker(args: ItemEventData){
    var speaker = <Speaker>args.view.bindingContext;
    navigationModule.gotoSpeakerPage(speaker);
}

export function editSession(args: ItemEventData) {
    var session = <Session>args.view.bindingContext; 

    if (!session.isBreak) {
        console.log('tap worked, reached function');
        navigationModule.gotoSessionEditPage(session);
    }
    // Takes to -> sessionedit-page, shows session description and speakers.
}
















//  function getAllSpeakers<T>(){
//     firebase.getValue('/Speakers')
//       .then(result =>{
//           addFruits();
//         return result.value;
//       })
//       .catch(error => {
//           console.log("Error: " + error);
//       });
// }

// function addFruits(){
//     firebase.push(
//         '/fruits',
//         { name: 'Bananas', country: 'Equador', updateTs: firebase.ServerValue.TIMESTAMP }
//     ).then(res => {
//         console.log("created key: " + res.key);
        
//     })
//     .catch(error => console.log(error));
// }


// export function addSessions(args: EventData){

//     var sessionSerive = new SessionService();
   
//     sessionSerive.loadSessionsViaFakerAndFirebase<Array<Session>>(vm.speakers,vm.rooms).then(
//         (result:Array<Session>)=> {
//             result.forEach(function(session){
                
//                 firebase.setValue(
//                     '/Sessions/'+session.id,
//                     session
//                 ).then(res => {
//                     console.log("value set for key: " + session.id);
//                 })
//                 .catch(error => console.log(error));
//             })
//         }
//     );
// }



// export function addSpeakers(args: EventData){

//     var sessionSerive = new SessionService();
    
//     sessionSerive.loadSpeakersViaFaker<Array<Speaker>>().then(
//         (result:Array<Speaker>)=> {
//             result.forEach(function(speaker){
                
//                 firebase.setValue(
//                     '/Speakers/'+speaker.id,
//                     speaker
//                 ).then(res => {
//                     console.log("value set for key: " + speaker.id);
//                 })
//                 .catch(error => console.log(error));
//             })
//         }
//     );
// }

// export function addRooms(args: EventData){

//     var sessionSerive = new SessionService();
    
//     sessionSerive.loadRoomInfoViaFaker<Array<RoomInfo>>().then(
//         (result:Array<RoomInfo>)=> {
//             result.forEach(function(roomInfo){
                
//                 firebase.setValue(
//                     '/Rooms/'+roomInfo.roomId,
//                     roomInfo
//                 ).then(res => {
//                     console.log("value set for key: " + roomInfo.roomId);
//                 })
//                 .catch(error => console.log(error));
//             })
//         }
//     );
// }