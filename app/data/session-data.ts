import { Speaker, RoomInfo, Session, SessionUpdate } from "~/shared/interfaces";

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
            var onQueryEvent = function (result) {
                // note that the query returns 1 match at a time
                // in the order specified in the query
                if (!result.error) {
                    console.log("Event type: " + result.type);
                    console.log("Key: " + result.key);

                    var res = Object.keys(result.value).map(key => result.value[key]);
                    resolve(res);
                }
            };

            firebase.query(
                onQueryEvent,
                "/Sessions",
                {
                    // set this to true if you want to check if the value exists or just want the event to fire once
                    // default false, so it listens continuously.
                    // Only when true, this function will return the data in the promise as well!
                    singleEvent: true,
                    orderBy: {
                        type: firebase.QueryOrderByType.CHILD,
                        value: 'start' // mandatory when type is 'child', order by start parameter of sessions
                        //https://github.com/EddyVerbruggen/nativescript-plugin-firebase/blob/master/docs/DATABASE.md
                    }
                }
            );

        });
    }

    // query all items from array fruits
    public queryValues() {
        var onQueryEvent = function (result) {
            // note that the query returns 1 match at a time
            // in the order specified in the query
            if (!result.error) {
                console.log("Event type: " + result.type);
                console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value));
            }
        };

        firebase.query(
            onQueryEvent,
            "/Sessions",
            {
                // set this to true if you want to check if the value exists or just want the event to fire once
                // default false, so it listens continuously.
                // Only when true, this function will return the data in the promise as well!
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'start' // mandatory when type is 'child'
                }
            }
        );
    }


    public saveSession(session: Session) {
        firebase.setValue(
            '/Sessions/'+session.id,
            session
        ).then(() => {
            console.log("value updated!");
        })
    }

    public saveSessionUpdate(session: SessionUpdate) {
        firebase.setValue(
            '/Sessions/'+session.id,
            session
        ).then(() => {
            console.log("value updated!");
        })
    }

    public createSession(session: Session){
        console.log("reached sessiondata for create")
        firebase.push(
            '/Sessions/',
            { calenderEventId: session.calendarEventId,  description: session.description, descriptionShort: session.descriptionShort, end: session.end, id: session.id, isBreak: session.isBreak, room: session.room, speakers: session.speakers, start: session.start, title: session.title }
        ).then(() => {
            console.log(session);
            console.log("session created");
        })
    }






    // public getAllSessions(): Promise<Array<Session>>{
    //     return new Promise<Array<Session>>((resolve,reject)=>{
    //         firebase.getValue('/Sessions')
    //         .then(result =>{
    //             var res = Object.keys(result.value).map(key => result.value[key]);
    //             resolve(res);
    //         })
    //         .catch(error =>console.log("Error: " + error))
    //     });
    // }
}