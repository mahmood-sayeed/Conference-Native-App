import { Observable } from "tns-core-modules/data/observable";
import { Session, Speaker, RoomInfo } from "~/shared/interfaces";
import { SessionData } from "~/data/session-data";

export class SessionEditViewModel extends Observable{

    private _session: Session;
    private _isLoading: boolean = false;
    private _sessionData: SessionData;
    private _speakers: Array<Speaker> = new Array<Speaker>(); 
    private _rooms: Array<RoomInfo> = new Array<RoomInfo>(); 
    

    constructor(session: Session){
        super();
        this._session = session;
        this._sessionData= new SessionData();
        console.log("contructor log")
    }

    public async init(){
        console.log("calling init edit");
        var promises = [];
        promises.push(this._sessionData.getAllSpeakers());
        promises.push(this._sessionData.getAllRooms());
             

        await Promise.all(promises)
            .then(async values => {
                this.pushSpeakers(values[0]);
                console.log("got speakers: " + this._speakers.length);
               
                this.pushRooms(values[1]);
                console.log("got rooms: " + this._rooms.length);
                this.onDataLoaded();
            })
            .catch(e => {
                console.log("error: ", e);
            });
    }

    

    private onDataLoaded() {
        this.set('isLoading', false);
    }

    private pushSpeakers(speakersFromservice: Array<Speaker>) {
        for(var i = 0;i<speakersFromservice.length;i++)
        {
            this._speakers.push(speakersFromservice[i]);
        }
     }

     private pushRooms(roomsFromservice: Array<RoomInfo>) {
        for(var i = 0;i<roomsFromservice.length;i++)
        {
            this._rooms.push(roomsFromservice[i]);
        }
     }

    get session() {
        return this._session;
    }

    get selectedRoom() {
        if(this._session && this._session.room)
        {
            return this._rooms.findIndex(x=>x.roomId ==this._session.room);
        }
        else return 0;
       
    }

    get speakers():Array<Speaker>{
        return this._speakers;
    }

    get rooms():Array<RoomInfo>{
        return this._rooms;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }
    set isLoading(value: boolean) {
        this._isLoading = value;
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: 'isLoading', value: this._isLoading });
    }

    public saveSession()
    {
        console.log(this._session.title);
        console.log(this._session.id);
        console.log('room '+this._session.room);
        this._sessionData.saveSession(this._session);
    }



}