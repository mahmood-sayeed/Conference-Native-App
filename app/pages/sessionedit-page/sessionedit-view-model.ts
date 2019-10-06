import { Observable } from "tns-core-modules/data/observable";
import { Session, Speaker, RoomInfo, ConfTimeSlot, ConferenceDay } from "~/shared/interfaces";
import { SessionData } from "~/data/session-data";
import { RoomData } from "~/data/room-data";
import { conferenceDays } from "~/shared/static-data";


export class SessionEditViewModel extends Observable{

    private _session: Session;
    private _isLoading: boolean = false;
    private _sessionData: SessionData;
    private _speakers: Array<Speaker> = new Array<Speaker>(); 
    private _rooms: Array<RoomInfo> = new Array<RoomInfo>(); 
    private _roomInfo: RoomInfo;
    private _roomData: RoomData;
    private SESSION_LENGTH = 60;
    private _timeslots: Array<any>=[];

    constructor(session: Session){
        super();
        this._session = session;
        this._sessionData= new SessionData();
        console.log("contructor log")
    }

    public async init(){
        console.log("calling init edit");
        this._roomData= new RoomData();

        var promises = [];
        promises.push(this._sessionData.getAllSpeakers());
        //promises.push(this._sessionData.getAllRooms());

        if (this._session.room) {
            promises.push(this._roomData.getRoomInfo(this._session.room));
        }

        this.generateConfTimeslots();
             

        await Promise.all(promises)
            .then(async values => {
                this.pushSpeakers(values[0]);
                console.log("got speakers: " + this._speakers.length);
               
                // this.pushRooms(values[1]);
                // console.log("got rooms: " + this._rooms.length);

                if(values.length>1)
                {
                    this._roomInfo= values[1];
                }
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

     public pushSpeaker(speaker: Speaker) {
        console.log("push speakers "+ this._session.speakers);
        if( !this.existingSpeakers){
            this.existingSpeakers = new Array<Speaker>();
        }
        this._session.speakers.push(speaker);
        this.existingSpeakers = this._session.speakers;
     }

     public removeSpeaker(id:string)
     {
         var index= this._session.speakers.findIndex(x=>x.id == id);
         this._session.speakers.splice(index,1);
         this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'session.speakers', value: this._session.speakers});
     }

     private pushRooms(roomsFromservice: Array<RoomInfo>) {
        for(var i = 0;i<roomsFromservice.length;i++)
        {
            this._rooms.push(roomsFromservice[i]);
        }
     }

     private async generateConfTimeslots()
     {
        for (var confDay of conferenceDays) {
            
            var startTimeList = this.getTimeRange(this.addMinutes(confDay.date, 240), this.addMinutes(confDay.date, 780), this.SESSION_LENGTH);
            for (var startTime of startTimeList) {
                 
                if (startTime.getHours() == 4) {
                    // isBreak = true;
                    // sessionTitle = 'Welcome Message';
                    continue;
                }
                else if (startTime.getHours() == 8) {
                    // isBreak = true;
                    // sessionTitle = 'Lunch Break';
                    continue;
                }
                var endTime = this.addMinutes(startTime, this.SESSION_LENGTH);

                var cTimeSlot= { name: startTime, value: startTime+"-"+endTime, start: startTime, end: endTime };
                this._timeslots.push(cTimeSlot);
            }
        
        }

     }

    
    private addMinutes(date: Date, minutes: number) {
        return new Date(date.getTime() + minutes*60000);
    }

    private getTimeRange(startTime: Date, endTime: Date, minutesBetween: number) : Array<Date> {
        var startTimeList: Array<Date> = [];
        var diffInMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
        var periods: number = diffInMinutes / minutesBetween;
        for (var i = 0; i <= periods; i++) {
            let periodStart = this.addMinutes(startTime, (minutesBetween * i));
            startTimeList.push(periodStart);
        }
        return startTimeList;
    }

    get timeSlots() {
        return this._timeslots;
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

    get roomInfo():RoomInfo{
        return this._roomInfo;
    }
    set roomInfo(value: RoomInfo) {
        this._roomInfo = value;
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: 'roomInfo', value: this.roomInfo });
    }

    get existingSpeakers():Array<Speaker>{
        return this._session.speakers;
    }
    set existingSpeakers(value: Array<Speaker>) {
        this._session.speakers = value;
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: 'existingSpeakers', value: this.existingSpeakers });
    }

    get start():string{
        return this._session.start;
    }

    get end():string{
        return this._session.end;
    }

    set start(value: string) {
        this._session.start = value;
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: 'start', value: this._session.start });
    }

    set end(value: string) {
        this._session.end = value;
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: 'end', value: this._session.end });
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