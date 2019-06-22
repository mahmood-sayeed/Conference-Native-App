import { Page, NavigatedData } from "tns-core-modules/ui/page";
import { GestureEventData, SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures/gestures";
import { RoomInfo } from "~/shared/interfaces";
import { MapViewModel } from '../map-page/map-view-model';
import * as animationHelperModule from "~/shared/animation-helper";
import * as roomMapsServiceModule from '../../services/room-map-service';
import * as navigationModule from "~/shared/navigation";
import { View } from "tns-core-modules/ui/core/view/view";

var vm: MapViewModel;

export function pageNavigatingTo(args: NavigatedData) {
    var page = <Page>args.object;
    
    if (!page || !page.navigationContext)
        return;
        
    vm = new MapViewModel(<RoomInfo>page.navigationContext.roomInfo);
    vm.isLoading = true;
    var img = <View>page.getViewById('imgMap');
    img.scaleX = 0.2;
    img.scaleY = 0.2;



    roomMapsServiceModule.getRoomImage(vm.roomInfo, function (imageSource) {
        vm.set('image', imageSource);
        vm.isLoading = false;
        animationHelperModule.fadeZoom(img);
    });

    page.bindingContext = vm;
}

export function backTap(args: GestureEventData) {
    navigationModule.goBack();
}

export function backSwipe(args: SwipeGestureEventData) {
    if (args.direction === SwipeDirection.right) {
        navigationModule.goBack();
    }
}