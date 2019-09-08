import { SessionEditViewModel } from "./sessionedit-view-model";
import { Page, NavigatedData, EventData, ShowModalOptions } from "tns-core-modules/ui/page/page";
import { Session } from "~/shared/interfaces";
import { GestureEventData, SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures/gestures";
import * as navigationModule from "~/shared/navigation";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { Button } from "tns-core-modules/ui/button/button";
const modalViewModulets = "pages/speaker-page/speaker-list-page";
const modalViewRooms = "pages/room-page/room-list-page";
const modalViewCommon = "pages/modal/modal-view-page";

var vm: SessionEditViewModel;
var page;

export async function pageNavigatingTo(args: NavigatedData) {
    page = <Page>args.object;
    
    if (!page)
        return;
        
    vm =  new SessionEditViewModel(<Session>page.navigationContext);
    vm.isLoading = true;
    await vm.init();
    page.bindingContext=vm;
}

export function onSpeakerAdd(args) {
    const mainView: Button = <Button>args.object;
    const option: ShowModalOptions = {
        context: { existingSpeakers: vm.session.speakers },
        closeCallback: (speaker) => {
            
            if(speaker.id)
            {
                vm.pushSpeaker(speaker);
            }
        },
        fullscreen: true
    };
    mainView.showModal(modalViewModulets, option);
}

export function onRoomChange(args) {
    const mainView: Button = <Button>args.object;
    const option: ShowModalOptions = {
        context: { existingRoom: vm.session.room },
        closeCallback: (room) => {
            
            if(room.roomId)
            {
                vm.roomInfo= room;
                vm.session.room=room.roomId;
            }
        },
        fullscreen: true
    };
    mainView.showModal(modalViewRooms, option);
}

export function onTimeChange(args) {
    const mainView: Button = <Button>args.object;
    const option: ShowModalOptions = {
        context: { items: vm.timeSlots },
        closeCallback: (value) => {
            
            if(value)
            {   
                var times = value.split('-',2);
                console.log(times);
               
                vm.start=times[0];
                vm.end=times[1];
            }
        },
        fullscreen: true
    };
    mainView.showModal(modalViewCommon, option);
}


export function backTap(args: GestureEventData) {
    navigationModule.goBack();
}

export function deleteSpeaker(args: GestureEventData) {
    vm.removeSpeaker(args.view.bindingContext.id)
}

export function backSwipe(args: SwipeGestureEventData) {
    if (args.direction === SwipeDirection.right) {
        navigationModule.goBack();
    }
}

export function onListPickerLoaded(args: EventData) {
    const listPicker = <ListPicker>args.object;
    listPicker.on("selectedIndexChange", (lpargs) => {
       
        //console.log(`ListPicker selected value: ${(<any>listPicker).selectedValue}`);
        //console.log(`ListPicker selected index: ${listPicker.selectedIndex}`);
    });
}

export function onSessionSave(args: EventData){

    console.log('From ts:' + vm.session.title);
    vm.saveSession();
}