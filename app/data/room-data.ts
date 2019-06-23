import { RoomInfo } from "~/shared/interfaces";

const firebase = require("nativescript-plugin-firebase");

export class RoomData {

    public saveRoomInfo(roomInfo: RoomInfo) {
        firebase.update(
            '/Rooms/'+roomInfo.roomId,
            roomInfo
        ).then(() => {
            console.log("value updated!");
        })
    }

}