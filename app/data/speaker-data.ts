import { Speaker } from "~/shared/interfaces";


const firebase = require("nativescript-plugin-firebase");

export class SpeakerData {

    public saveSpeaker(speaker: Speaker) {
        firebase.update(
            '/Speakers/'+speaker.id,
            speaker
        ).then(() => {
            console.log("value updated!");
        })
    }

}