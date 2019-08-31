import { Speaker, RoomInfo, Session, User } from "~/shared/interfaces";

const firebase = require("nativescript-plugin-firebase");

export class UserData{

    public getUser(): Promise<User>{
        return new Promise<User>((resolve,reject)=>{
            firebase.getCurrentUser()
            .then(user =>{
                console.log("User uid: " + user.uid);
                firebase.getValue('/Users/'+user.uid)
                .then(result =>{
                    if(!result.value)
                    {
                        var us: User = {
                            uuid: user.uid,
                            favourites: new Array<string>()
                        }
                        result.value=us;
                    }
                    
                    resolve(result.value);
                })
                .catch(usererror =>console.log("Error: " + usererror));
            })
            .catch(error => console.log("Trouble in user: " + error));
           
        });
    }

    

   

    public saveUser(user: User) {
        firebase.update(
            '/Users/'+user.uuid,
            user
        ).then(() => {
            console.log("value updated!");
        })
    }

    

   
}