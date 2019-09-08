import { Page } from "tns-core-modules/ui/page/page";
import { fromObject, EventData } from "tns-core-modules/data/observable/observable";
import { ListPicker } from "tns-core-modules/ui/list-picker/list-picker";

let closeCallback;


export function onShownModally(args) {
    const context = args.context;
    closeCallback = args.closeCallback;
    const page: Page = <Page>args.object;
    const vm = fromObject({
        items: args.context.items,
        index: 0,
        selectedItem: ""
    });
    page.bindingContext = vm;
}

export function onListPickerLoaded(args: EventData) {
    const listPicker = <ListPicker>args.object;
    const vm = listPicker.page.bindingContext;
    listPicker.on("selectedIndexChange", (lpargs) => {
        
       
    });
}

export function onSave(args) {
    const page: Page = <Page>args.object.page;
    const bindingContext = page.bindingContext;
    const value = bindingContext.get("selectedItem");
    closeCallback(value);
}