import { Observable } from "tns-core-modules/data/observable";
import { Session, Speaker, RoomInfo } from "~/shared/interfaces";
import { SessionData } from "~/data/session-data";

export class SessionEditViewModel extends Observable{

    private _session: Session;
    private _isLoading: boolean = false;
    private _sessionData: SessionData;

    constructor(session: Session){
        super();
        this._session = session;
        this._sessionData= new SessionData();
    }

    get session() {
        return this._session;
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
        this._sessionData.saveSession(this._session);
    }



}