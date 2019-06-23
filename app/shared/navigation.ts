import * as frameModule from "tns-core-modules/ui/frame";

export function startingPage() {
    return 'pages/main/main-page';
    
}

export function gotoSessionPage(session){
    frameModule.topmost().navigate({
        moduleName:'pages/session-page/session-page' ,
        context: session
    });
}

export function gotoRoomPage(room){
    frameModule.topmost().navigate({
        moduleName:'pages/room-page/room-page' ,
        context: room
    });
}

export function gotoRoomMapPage(session){
    frameModule.topmost().navigate({
        moduleName:'pages/map-page/map-page' ,
        context: session,
        transition:{
            name: 'fade',
            duration: 1000,
            curve: 'easeIn'
        }
    });
}

export function goBack() {
    frameModule.topmost().goBack();
}

export function gotoMainPage(){
    frameModule.topmost().navigate({
        moduleName: 'pages/main/main-page',
        transition:{
            name: 'fade',
            duration: 500,
            curve: 'easeIn'
        }
    });
}

export function gotoAdminPage(){
    frameModule.topmost().navigate({
        moduleName: 'pages/admin/admin-page',
        transition:{
            name: 'slideTop',
            duration:500,
            curve: 'easeIn'
        }
    })
}