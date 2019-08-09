import * as appSettingModule from "tns-core-modules/application-settings";
import { User } from "~/shared/interfaces";
import { SessionViewModel } from "~/pages/session-page/session-view-model";
import { UserData } from "~/data/user-data";

export var userData: UserData;

try {
   userData= new UserData();
}
catch(error) {
    console.log("Error while retreivng favourites : "+error);
    
}

export function addToFavourites(session: SessionViewModel) {
    if (session.user.favourites.indexOf(session.id) >= 0) {
        // Sesson already added to favourites.
        return;
    }
    persistSessionToFavourites(session);
}

export function removeFromFavourites(session: SessionViewModel) {
    var index = session.user.favourites.indexOf(session.id);
    if (index >= 0) {
        session.user.favourites.splice(index, 1);
        updateFavourites(session.user);
    }
}

function persistSessionToFavourites(session: SessionViewModel) {
    session.user.favourites.push(session.id);
    updateFavourites(session.user);
}

function updateFavourites(user: User) {
    console.log('favourites: ' + user.favourites);
    userData.saveUser(user);
}