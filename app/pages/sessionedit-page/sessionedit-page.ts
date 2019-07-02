import { SessionEditViewModel } from "./sessionedit-view-model";
import { Page, NavigatedData, EventData } from "tns-core-modules/ui/page/page";
import { Session } from "~/shared/interfaces";
import { GestureEventData, SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures/gestures";
import * as navigationModule from "~/shared/navigation";


var vm: SessionEditViewModel;
var page;

export function pageNavigatingTo(args: NavigatedData) {
    page = <Page>args.object;
    
    if (!page || !page.navigationContext)
        return;
        
    vm = new SessionEditViewModel(<Session>page.navigationContext);
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

export function onSessionSave(args: EventData){

    console.log('From ts:' + vm.session.title);
    vm.saveSession();
}