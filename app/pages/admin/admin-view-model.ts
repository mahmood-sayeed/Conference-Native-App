import { Observable, initNativeView } from "tns-core-modules/ui/page/page";
import { Speaker, Session, RoomInfo } from "~/shared/interfaces";
import { SessionData } from "~/data/session-data";
import { SessionViewModel } from "../session-page/session-view-model";
import { SessionService } from "~/services/sessions-service";
import { SegmentedBarItem } from "tns-core-modules/ui/segmented-bar/segmented-bar";
import { conferenceDays } from "~/shared/static-data";
const firebase = require("nativescript-plugin-firebase");




export class AdminViewModel extends Observable{
    private _speakers: Array<Speaker>; 
    private _speakers2: Array<Speaker>; 
    private _rooms: Array<RoomInfo>; 
    private _sessionData: SessionData;

    public selectedViewIndex:number;
    private _allSessions: Array<SessionViewModel> = new Array<SessionViewModel>();
    private _sessions: Array<SessionViewModel>;
    private _selectedIndex;
    private _sessionSerive: SessionService;
    private _confDayOptions: Array<SegmentedBarItem>;

    private _sessionAdmin: Array<Session>;

    constructor(){
        super();
        this._sessionData = new SessionData();
        this._sessionSerive = new SessionService();
        this.selectedIndex = 0;
        this.selectedViewIndex = 1;
        this.set('isLoading',true);
        this.set('isSessionsPage',true);
        this._speakers2= [
            {id: "someId", name: "Ashraf", title: "motivational speaker", company: "company", 
            picture: "data:image/png;base64,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", 
            twitterName: "tweet"},
            {id: "someId2", name: "Mahmood", title: "aiwein", company: "Faltu", 
            picture: "data:image/png;base64,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", 
            twitterName: "none"}
        ]
        this._confDayOptions=[];
        for (let i = 0; i < conferenceDays.length; i++) {
            const item = new SegmentedBarItem();
            item.title = conferenceDays[i].title;
            this._confDayOptions.push(item);
        }
    }

    public init(){
        console.log("calling init");
        this._sessionData.getAllSpeakers()
        .then((result:Array<Speaker>)=>{
            this._speakers=result;
            console.log("got speakers: " + this._speakers.length);
        });

        this._sessionData.getAllRooms()
        .then((result:Array<RoomInfo>)=>{
            this._rooms=result;
            console.log("got rooms: " + this._rooms.length);
        });

        this._sessionData.getAllSessions()
        .then((result:Array<Session>)=>{
            this._sessionAdmin=result;
            console.log("got sessions: " + this._sessionAdmin.length);
        });
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
        console.log("getting speakers");
        
        if(this._speakers !== undefined) {
            console.log("number of speakers: " + this._speakers.length);
        }
        return this._speakers;
        
            
        // return new Array<Speaker>();
    }

    get rooms():Array<RoomInfo>{
        return this._rooms;
    }

    //Sessions

    get sessionAdmin():Array<Session>{
        return this._sessionAdmin;
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

    private pushSessions(sessionsFromservice: Array<Session>) {
        for(var i = 0;i<sessionsFromservice.length;i++)
        {
            var newSession = new SessionViewModel(sessionsFromservice[i]);
            this._allSessions.push(newSession);
        }
     }
}

