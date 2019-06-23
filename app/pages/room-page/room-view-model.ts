import { Observable } from "tns-core-modules/data/observable";
import { ImageSource } from "tns-core-modules/image-source";
import { RoomInfo } from '../../shared/interfaces';
import { RoomData } from "~/data/room-data";

export class RoomViewModel extends Observable {
    private _roomInfo: RoomInfo;
    private _isLoading: boolean = false;
    private _roomData: RoomData;
   
    constructor(roomInfo: RoomInfo) {
        super();
        this._roomInfo = roomInfo;
        this._roomData= new RoomData();
    }
    
  
    
    get roomInfo() {
        return this._roomInfo;
    }
    
    get isLoading(): boolean {
        return this._isLoading;
    }
    set isLoading(value: boolean) {
        this._isLoading = value;
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: 'isLoading', value: this._isLoading });
    }

    public saveRoomInfo()
    {
        console.log(this._roomInfo.name);
        this._roomData.saveRoomInfo(this._roomInfo);
    }
}