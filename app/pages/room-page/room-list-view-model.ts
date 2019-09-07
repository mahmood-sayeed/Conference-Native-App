import { Observable } from "tns-core-modules/data/observable";
import { Speaker, RoomInfo } from "~/shared/interfaces";
import { SpeakerData } from "~/data/speaker-data";
import { SessionData } from "~/data/session-data";


export class RoomListViewModel extends Observable {

    private _rooms: Array<RoomInfo> = new Array<RoomInfo>(); 
    private _addedRoom: string; 
    private _isLoading: boolean = false;
    private _sessionData: SessionData;

    constructor(existingRoom: string){
        super();
        if(existingRoom)
        {
            this._addedRoom = existingRoom;
        }
        
        this._sessionData= new SessionData();
        this.set('isLoading',true);
    }

    public async init(){
        console.log("calling init");

        var promises = [];
        promises.push(this._sessionData.getAllRooms());

        await Promise.all(promises)
            .then(async values => {
                await this.pushRooms(values[0]);
                console.log("got rooms: " + this._rooms.length);

                this.onDataLoaded();
                
            })
            .catch(e => {
                console.log("error: ", e);
            });

       
    }

    private pushRooms(roomsFromservice: Array<RoomInfo>) {
        for(var i = 0;i<roomsFromservice.length;i++)
        {
            this._rooms.push(roomsFromservice[i]);
        }
     }

    

    private onDataLoaded() {
        this.filter();
        this.set('isLoading',false);
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

    private filter() {
        var index= this._rooms.findIndex(x=>x.roomId == this._addedRoom);
        if(index >=0)
        {
            this._rooms.splice(index,1);
    
            console.log(this._rooms.length);
            this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'rooms', value: this._rooms});

        }
        
    }
}