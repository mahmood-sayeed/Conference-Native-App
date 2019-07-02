/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData, fromObject } from "tns-core-modules/data/observable";
import { Page, NavigatedData } from "tns-core-modules/ui/page";
import { MainViewModel } from "./main-view-model";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { SessionViewModel } from "../session-page/session-view-model";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import * as navigationModule from "~/shared/navigation";
import { Button } from "tns-core-modules/ui/button/button";
import * as animationHelperModule from "~/shared/animation-helper";
import { AdminViewModel } from "../admin/admin-view-model";

var vm;
var SIDE_DRAWER_ID = 'SideDrawer';
var page;

export function pageNavigatingTo(args: NavigatedData) {
    page = <Page>args.object;
    vm = args.context;
    
}

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onPageLoaded(args: EventData) {
   
    page= <Page>args.object;
    vm=new MainViewModel();

    page.bindingContext = vm;
    vm.init();

    
}

export function toggleFavorite(args: GestureEventData){
    var session = <SessionViewModel>args.view.bindingContext;
    var gl = <any>args.object;
    var img = gl.getViewById('imgFav');
    
    animationHelperModule.popAnimate(img)
        .then(() => {
            session.toggleFavorite();
        });
}
export function selectView(args: EventData) {
    var btn = <Button>args.object;
    var slideBar = <any>page.getViewById(SIDE_DRAWER_ID);
    slideBar.closeDrawer();

    vm.selectView(parseInt((<any>btn).tag), btn.text);
}

export function selectSession(args: ItemEventData) {
    var session = <SessionViewModel>args.view.bindingContext;

    if (!session.isBreak) {
        navigationModule.gotoSessionPage(session);
    }
    // Takes to -> session-page, shows session description and speakers.
}

export function showSlideout(args: GestureEventData) {
    var slideBar = <any>page.getViewById(SIDE_DRAWER_ID);
    slideBar.showDrawer();
}
