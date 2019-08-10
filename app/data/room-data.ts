import { RoomInfo } from "~/shared/interfaces";

const firebase = require("nativescript-plugin-firebase");

export class RoomData {

    public saveRoomInfo(roomInfo: RoomInfo) {
        firebase.update(
            '/Rooms/' + roomInfo.roomId,
            roomInfo
        ).then(() => {
            console.log("value updated!");
        })
    }

    public  getRoomInfo(roomId: string): Promise<RoomInfo> {
        return  new Promise<RoomInfo>((resolve, reject) => {
             firebase.getValue('/Rooms/' + roomId)
                .then(result => {

                    resolve(result.value);
                })
                .catch(roomerror => console.log("Error: " + roomerror));
        });
    }

}