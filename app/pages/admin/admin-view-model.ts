import { Observable, initNativeView } from "tns-core-modules/ui/page/page";
import { Speaker, Session, RoomInfo } from "~/shared/interfaces";
import { SessionData } from "~/data/session-data";
import { SessionViewModel } from "../session-page/session-view-model";
import { SessionService } from "~/services/sessions-service";
import { SegmentedBarItem } from "tns-core-modules/ui/segmented-bar/segmented-bar";
import { conferenceDays } from "~/shared/static-data";
import { RoomData } from "~/data/room-data";
const firebase = require("nativescript-plugin-firebase");




export class AdminViewModel extends Observable{
    private _speakers: Array<Speaker> = new Array<Speaker>(); 
    private _rooms: Array<RoomInfo> = new Array<RoomInfo>(); 
    private _sessionData: SessionData;
    private _roomInfo: RoomInfo;
    private _roomData: RoomData;

    public selectedViewIndex:number;
    private _allSessions: Array<SessionViewModel> = new Array<SessionViewModel>();
    private _sessions: Array<SessionViewModel>;
    private _selectedIndex;
    private _confDayOptions: Array<SegmentedBarItem>;

    constructor(){
        super();
        this._sessionData = new SessionData();
        
        this.selectedIndex = 0;
        this.selectedViewIndex = 1;
        this.set('isLoading',true);
        this.set('isSessionsPage',true);
        
        this._confDayOptions=[];
        for (let i = 0; i < conferenceDays.length; i++) {
            const item = new SegmentedBarItem();
            item.title = conferenceDays[i].title;
            this._confDayOptions.push(item);
        }
    }

    public init(){
        console.log("calling init");

        var promises = [];
        promises.push(this._sessionData.getAllSpeakers());
        promises.push(this._sessionData.getAllRooms());
        promises.push(this._sessionData.getAllSessions());
        

        Promise.all(promises)
            .then(async values => {
                this.pushSpeakers(values[0]);
                console.log("got speakers: " + this._speakers.length);

                this.pushRooms(values[1]);
                console.log("got rooms: " + this._rooms.length);

                this._roomData= new RoomData();

                await this.pushSessions(values[2]);
                
                console.log("got sessions: " + this._allSessions.length);

                console.log("all the promises were resolved!");

                this.onDataLoaded();
                
            })
            .catch(e => {
                console.log("error: ", e);
            });

       
    }

    

    private onDataLoaded() {
        this.set('isLoading',false);
        this.filter();
    }
    
    public selectView(index: number, titleText: string) {
        this.selectedViewIndex = index;
        if (this.selectedViewIndex < 2) {
            this.filter();
        }
        
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "selectedViewIndex", value: this.selectedViewIndex });
        this.set('actionBarTitle', titleText);
        this.set('isSessionsPage', this.selectedViewIndex < 2);
    }

    get selectedIndex():number{
        return this._selectedIndex;
    }

    set selectedIndex(value: number) {
        if (this._selectedIndex !== value) {
            this._selectedIndex = value;
            this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "selectedIndex", value: value });

            this.set('dayHeader', conferenceDays[value].desc);
            this.filter();
        }
    }
    get speakers():Array<Speaker>{
        return this._speakers;
    }

    get rooms():Array<RoomInfo>{
        return this._rooms;
    }



    private filter() {
        this._sessions = this._allSessions.filter(s=> {
            return s.startDt.getDate() === conferenceDays[this.selectedIndex].date.getDate();
        });

        if (this.selectedViewIndex === 0) {
            this._sessions = this._sessions.filter(i=> { return i.favorite || i.isBreak; });
        }

        this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'sessions', value: this._sessions});
    }

    //session stuff

    get sessions():Array<SessionViewModel>{
        return this._sessions;
    }
    get confDayOptions(): Array<SegmentedBarItem> {
       return this._confDayOptions;
    }

    private async pushSessions(sessionsFromservice: Array<Session>) {
        for(var i = 0;i<sessionsFromservice.length;i++)
        {
            await this.getSingleRoom(sessionsFromservice[i]);
            var newSession = await new SessionViewModel(sessionsFromservice[i], null, this._roomInfo);
            this._allSessions.push(newSession);
        }
     }

     private async getSingleRoom(sessionsFromservice: Session) {

        this._roomInfo=null;
        if (sessionsFromservice.room) {
            this._roomInfo = await this._roomData.getRoomInfo(sessionsFromservice.room);
        }

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
}

