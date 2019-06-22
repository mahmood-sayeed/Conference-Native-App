import { View } from "tns-core-modules/ui/core/view";
import { AnimationDefinition } from "tns-core-modules/ui/animation/animation";
import { AnimationCurve } from "tns-core-modules/ui/enums";

let duration: number = 250;
let scaleFactor: number = 1.8;

export function fadeZoom(view: View) {
    return view.animate({
        duration: 3000,
        opacity: 1.0,
        scale: { x: 1.0, y: 1.0 }
    });
}

export function popAnimate(view: View) {
    
    var defPopUp: AnimationDefinition = {
        duration:  duration,
        scale: { x: scaleFactor, y: scaleFactor },
        curve: AnimationCurve.easeIn
        
    };
    
    var defPopDown: AnimationDefinition = {
        duration:  duration,
        scale: { x: 1.0, y: 1.0 },
        curve: AnimationCurve.easeOut
        
    };
    
    return view.animate(defPopUp)
               .then(() => {
                   view.animate(defPopDown);
               });
}