import { Page } from "tns-core-modules/ui/page/page";

import { SpeakerListViewModel } from "./speaker-list-view-model";
import { Speaker } from "~/shared/interfaces";
import { ItemEventData } from "tns-core-modules/ui/list-view/list-view";

let closeCallback;

var vm:SpeakerListViewModel;
var existingSpeakers: Array<Speaker> = new Array<Speaker>();

export  function onShownModally(args) {

    existingSpeakers = args.context.existingSpeakers;
    closeCallback = args.closeCallback;
    
    const page: Page = <Page>args.object;
    vm= new SpeakerListViewModel(existingSpeakers);
    page.bindingContext = vm;
    vm.init();    
    
}

export function addSpeaker(args: ItemEventData){
    var speaker = <Speaker>args.view.bindingContext;
    closeCallback(speaker);
}