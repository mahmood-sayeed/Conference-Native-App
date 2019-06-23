import { Page, NavigatedData } from "tns-core-modules/ui/page";
import { GestureEventData, SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures/gestures";
import { RoomInfo } from "~/shared/interfaces";
import * as animationHelperModule from "~/shared/animation-helper";
import * as roomMapsServiceModule from '../../services/room-map-service';
import * as navigationModule from "~/shared/navigation";
import { View, EventData } from "tns-core-modules/ui/core/view/view";
import { RoomViewModel } from "./room-view-model";

var vm: RoomViewModel;
var page;

export function pageNavigatingTo(args: NavigatedData) {
    page = <Page>args.object;
    
    if (!page || !page.navigationContext)
        return;
        
    vm = new RoomViewModel(<RoomInfo>page.navigationContext);
    vm.isLoading = true;
    
    page.bindingContext = vm;

    vm.isLoading=false;
}

export function backTap(args: GestureEventData) {
    navigationModule.goBack();
}

export function backSwipe(args: SwipeGestureEventData) {
    if (args.direction === SwipeDirection.right) {
        navigationModule.goBack();
    }
}

export function onSave(args: EventData){

    console.log('From ts:' + vm.roomInfo.name);
    vm.saveRoomInfo();
}