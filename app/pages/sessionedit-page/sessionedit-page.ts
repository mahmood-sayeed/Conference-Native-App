import { SessionEditViewModel } from "./sessionedit-view-model";
import { Page, NavigatedData, EventData } from "tns-core-modules/ui/page/page";
import { Session } from "~/shared/interfaces";
import { GestureEventData, SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures/gestures";
import * as navigationModule from "~/shared/navigation";
import { ListPicker } from "tns-core-modules/ui/list-picker";

const pokemonList = ["Bulbasaur", "Parasect", "Venonat", "Venomoth", "Diglett",
    "Dugtrio", "Meowth", "Persian", "Psyduck", "Arcanine", "Poliwrath", "Machoke"];
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



export function backTap(args: GestureEventData) {
    navigationModule.goBack();
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