import { SpeakerViewModel } from "./speaker-view-model";
import { Page, NavigatedData, EventData } from "tns-core-modules/ui/page";
import { Speaker } from "~/shared/interfaces";
import { GestureEventData, SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures/gestures";
import * as navigationModule from "~/shared/navigation";


var vm: SpeakerViewModel;
var page;

export function pageNavigatingTo(args: NavigatedData) {
    page = <Page>args.object;
    
    if (!page || !page.navigationContext)
        return;
        
    vm = new SpeakerViewModel(<Speaker>page.navigationContext);
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

export function onSpeakerSave(args: EventData){

    console.log('From ts:' + vm.speaker.name);
    vm.saveSpeaker();
}

