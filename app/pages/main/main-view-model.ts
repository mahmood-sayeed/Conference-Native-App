import { Observable } from "tns-core-modules/data/observable";
import { Session, ConferenceDay } from "~/shared/interfaces";
import { SessionViewModel } from "../session-page/session-view-model";
import { SessionService } from "~/services/sessions-service";
import { conferenceDays } from "~/shared/static-data";
import {SegmentedBarItem} from 'tns-core-modules/ui/segmented-bar';

export class MainViewModel extends Observable {

    private _selectedIndex;
    private _allSessions: Array<SessionViewModel> = new Array<SessionViewModel>();
    private _sessions: Array<SessionViewModel>;
    
    private _sessionSerive: SessionService;
    public selectedViewIndex:number;
    private _confDayOptions: Array<SegmentedBarItem>;
   
    constructor() {
        super();
        this._sessionSerive = new SessionService();
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

    get sessions():Array<SessionViewModel>{
        return this._sessions;
    }
    get confDayOptions(): Array<SegmentedBarItem> {
       return this._confDayOptions;
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

    public init(){
        this._sessionSerive.loadSessions<Array<Session>>()
        .then((result:Array<Session>)=>{
            this.pushSessions(result);
            this.onDataLoaded();
        });

        
    }
    private onDataLoaded() {
        this.set('isLoading',false);
        this.filter();
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
    public selectView(index: number, titleText: string) {
        this.selectedViewIndex = index;
        if (this.selectedViewIndex < 2) {
            this.filter();
        }
        
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: "selectedViewIndex", value: this.selectedViewIndex });
        this.set('actionBarTitle', titleText);
        this.set('isSessionsPage', this.selectedViewIndex < 2);
    }
    private pushSessions(sessionsFromservice: Array<Session>) {
       for(var i = 0;i<sessionsFromservice.length;i++)
       {
           var newSession = new SessionViewModel(sessionsFromservice[i]);
           this._allSessions.push(newSession);
       }
    }

   
}
