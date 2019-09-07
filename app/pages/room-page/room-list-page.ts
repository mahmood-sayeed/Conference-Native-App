import { Page } from "tns-core-modules/ui/page/page";
import { Speaker, RoomInfo } from "~/shared/interfaces";
import { ItemEventData } from "tns-core-modules/ui/list-view/list-view";
import { RoomListViewModel } from "./room-list-view-model";

let closeCallback;

var vm:RoomListViewModel;
var existingRoom: string;

export  function onShownModally(args) {

    existingRoom = args.context.existingRoom;
    closeCallback = args.closeCallback;
    
    const page: Page = <Page>args.object;
    vm= new RoomListViewModel(existingRoom);
    page.bindingContext = vm;
    vm.init();    
    
}

export function addRoom(args: ItemEventData){
    var room = <RoomInfo>args.view.bindingContext;
    closeCallback(room);
}