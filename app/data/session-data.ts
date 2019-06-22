import { Speaker, RoomInfo, Session } from "~/shared/interfaces";

const firebase = require("nativescript-plugin-firebase");

export class SessionData{

    public getAllSpeakers(): Promise<Array<Speaker>>{
        return new Promise<Array<Speaker>>((resolve,reject)=>{
            firebase.getValue('/Speakers')
            .then(result =>{
                var res = Object.keys(result.value).map(key => result.value[key])
                resolve(res);
            })
            .catch(error =>console.log("Error: " + error))
        });
    }

    public getAllRooms(): Promise<Array<RoomInfo>>{
        return new Promise<Array<RoomInfo>>((resolve,reject)=>{
            firebase.getValue('/Rooms')
            .then(result =>{
                var res = Object.keys(result.value).map(key => result.value[key])
                resolve(res);
            })
            .catch(error =>console.log("Error: " + error))
        });
    }


    public getAllSessions(): Promise<Array<Session>>{
        return new Promise<Array<Session>>((resolve,reject)=>{
            firebase.getValue('/Sessions')
            .then(result =>{
                var res = Object.keys(result.value).map(key => result.value[key])
                resolve(res);
            })
            .catch(error =>console.log("Error: " + error))
        });
    }
}