import { Observable } from "tns-core-modules/data/observable";
import { Speaker } from "~/shared/interfaces";
import { SpeakerData } from "~/data/speaker-data";
import { SessionData } from "~/data/session-data";


export class SpeakerListViewModel extends Observable {

    private _speakers: Array<Speaker> = new Array<Speaker>(); 
    private _addedSpeakers: Array<Speaker> = new Array<Speaker>(); 
    private _isLoading: boolean = false;
    private _sessionData: SessionData;

    constructor(existingSpeakers: Array<Speaker>){
        super();
        if(existingSpeakers)
        {
            this._addedSpeakers=existingSpeakers;
        }
        
        this._sessionData= new SessionData();
        this.set('isLoading',true);
    }

    public async init(){
        console.log("calling init");

        var promises = [];
        promises.push(this._sessionData.getAllSpeakers());

        await Promise.all(promises)
            .then(async values => {
                await this.pushSpeakers(values[0]);
                console.log("got speakers: " + this._speakers.length);

                this.onDataLoaded();
                
            })
            .catch(e => {
                console.log("error: ", e);
            });

       
    }

    private pushSpeakers(speakersFromservice: Array<Speaker>) {
        for(var i = 0;i<speakersFromservice.length;i++)
        {
            this._speakers.push(speakersFromservice[i]);
        }
     }

    

    private onDataLoaded() {
        this.filter();
        this.set('isLoading',false);
    }

    get speakers():Array<Speaker>{
        return this._speakers;
    }

   

    get isLoading(): boolean {
        return this._isLoading;
    }
    set isLoading(value: boolean) {
        this._isLoading = value;
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: 'isLoading', value: this._isLoading });
    }

    private filter() {
        this._speakers = this._speakers.filter(s=> {
            return this._addedSpeakers.findIndex(k=>s.id==k.id) < 0;
        });

        console.log(this._speakers.length);
        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'speakers', value: this._speakers});
    }
}