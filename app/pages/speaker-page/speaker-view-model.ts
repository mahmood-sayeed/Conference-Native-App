import { Observable } from "tns-core-modules/data/observable";
import { Speaker } from "~/shared/interfaces";
import { SpeakerData } from "~/data/speaker-data";


export class SpeakerViewModel extends Observable {

    private _speaker: Speaker;
    private _isLoading: boolean = false;
    private _speakerData: SpeakerData;

    constructor(speaker: Speaker){
        super();
        this._speaker = speaker;
        this._speakerData= new SpeakerData();
    }

    get speaker() {
        return this._speaker;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }
    set isLoading(value: boolean) {
        this._isLoading = value;
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: 'isLoading', value: this._isLoading });
    }

    public saveSpeaker()
    {
        console.log(this._speaker.name);
        this._speakerData.saveSpeaker(this._speaker);
    }
}