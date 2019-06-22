import { SessionViewModel } from "./session-view-model";
import { Page, NavigatedData } from "tns-core-modules/ui/page/page";
import { Button } from 'tns-core-modules/ui/button';
import { Label } from 'tns-core-modules/ui/label';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { EventData } from "tns-core-modules/data/observable";
import * as animationHelperModule from "~/shared/animation-helper";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";
import * as navigationModule from "~/shared/navigation"

var vm: SessionViewModel;
var page: Page;

export function pageNavigatingTo(args: NavigatedData) {
    page = <Page>args.object;
    vm = args.context;
    page.bindingContext = vm;
}

export function toggleFavorite(args) {
    var gl = <any>args.object;
    var img = gl.getViewById('imgFav');
    
    animationHelperModule.popAnimate(img)
        .then(() => {
            vm.toggleFavorite();
        });
}

export function toggleDescription(args: EventData) {
    var btn = <Button>args.object;
    var txtDesc = <Label>page.getViewById('txtDescription');
    var scroll = <ScrollView>page.getViewById('scroll');

    if (btn.text === 'MORE') {
        btn.text = 'LESS';
        txtDesc.text = vm.description;
    }
    else {
        btn.text = 'MORE';
        txtDesc.text = vm.descriptionShort;
        scroll.scrollToVerticalOffset(0, false);
    }
}
export function showMapTap(args: GestureEventData) {
    navigationModule.gotoRoomMapPage(vm);
}


export function backTap(args: GestureEventData) {
    navigationModule.goBack();
    
}