import { Observable } from "tns-core-modules/data/observable";
import { Session, Speaker, RoomInfo, User } from "~/shared/interfaces";
import * as favoritesServiceModule from '~/services/favourites-service';


export class SessionViewModel extends Observable implements Session{

    private _session: Session;
    private _favorite: boolean;
    private _startDt: Date;
    private _endDt: Date;
    private _user: User;
    private _roomInfo: RoomInfo;
    

    
    constructor(source?: Session, user?: User,  room?: RoomInfo) {
        super();
        if(source)
        {
            
            this._session= source;
            this._startDt = this.fixDate(new Date(source.start));
            this._endDt = this.fixDate(new Date(source.end));
            if(room){
               
                this._roomInfo= room;
            }
            if(user)
            {
                this._user = user;
                if(user.favourites.indexOf(this._session.id) > -1)
                {
                    this._favorite=true;

                }
            }
        }

        
        
    }

    get user(): User
    {
        return this._user;
    }

    get session(): Session
    {
        return this._session;
    }

    get id():string{
        return this._session.id;
    }
    get title():string{
        return this._session.title;
    }
    get room():string{
        if(this._roomInfo)
        {
            return this._roomInfo.name;
        }
        return null;
    }
    get roomInfo():RoomInfo{
        return this._roomInfo;
    }
    get start():string{
        return this._session.start;
    }
    get end():string{
        return this._session.end;
    }
    get startDt(): Date {
        return this._startDt;
    }

    get endDt(): Date {
        return this._endDt;
    }
    
    get range(): string {
        var startMinutes = this.startDt.getMinutes() + '';
        var endMinutes = this.endDt.getMinutes() + '';
        var startAM = this.startDt.getHours() < 12 ? 'am' : 'pm';
        var endAM = this.endDt.getHours() < 12 ? 'am' : 'pm';

        var startHours = (this.startDt.getHours() <= 12 ? this.startDt.getHours() : this.startDt.getHours() - 12) + '';
        var endHours = (this.endDt.getHours() <= 12 ? this.endDt.getHours() : this.endDt.getHours() - 12) + '';

        return (startHours.length === 1 ? '0' + startHours : startHours) + ':' + (startMinutes.length === 1 ? '0' + startMinutes : startMinutes) + startAM +
            ' - ' + (endHours.length === 1 ? '0' + endHours : endHours) + ':' + (endMinutes.length === 1 ? '0' + endMinutes : endMinutes) + endAM;
    }
    get speakers():Array<Speaker>{
        return this._session.speakers;
    }
    get isBreak():boolean{
        return this._session.isBreak;
    }
    get description():string{
        return this._session.description;
    }
    get descriptionShort():string{
        if(this.description.length>160){
            return this.description.substr(0,160)+'...';
        }
        else{
            return this.description;
        }
        
    }
    get calendarEventId():string{
        return this._session.calendarEventId;
    }
    get favorite(): boolean{
        return this._favorite;
    }
    set favorite(value: boolean){
        if(this._favorite != value && !this._session.isBreak){
            this._favorite = value;
            this.notify({object: this, eventName: Observable.propertyChangeEvent, propertyName: 'favorite', value: this.favorite});
        }
    }
    public toggleFavorite(){
        this.favorite = !this.favorite;
        if(!this._session.isBreak){
            if(this.favorite) {
                favoritesServiceModule.addToFavourites(this);
    
            }
            else {
                favoritesServiceModule.removeFromFavourites(this);
            }
        }
        
    }
    private fixDate(date: Date): Date {
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }
}