import * as fakeDataServiceModule from './fake-data-service';
import { SessionData } from '~/data/session-data';
import { Session } from '~/shared/interfaces';

export class SessionService{

    private _useHttpService: boolean = false;
    private _sessionData: SessionData;

    public loadSessions<T>(): Promise<T>{
        if(this._useHttpService){
            return this.loadSessionsViaHttp<T>();
        }
        else{
            return this.loadSessionsViaFirebase<T>();
        }
    }

    loadSessionsViaFaker<T>(): Promise<T> {
        return new Promise<T>((resolve,reject)=>{
            let speakers = fakeDataServiceModule.genereateSpeakers();
            let roomInfos = fakeDataServiceModule.generateRoomInfos();
            let sessions = <any>fakeDataServiceModule.generateSessions(speakers,roomInfos);
            resolve(sessions);
        });
    }
    loadSessionsViaHttp<T>(): Promise<T> {
        return new Promise<T>(()=>{});
    }

    public loadSpeakersViaFaker<T>(): Promise<T> {
        return new Promise<T>((resolve,reject)=>{
            let speakers = <any>fakeDataServiceModule.genereateSpeakers();
           
            resolve(speakers);
        });
    }

    public loadRoomInfoViaFaker<T>(): Promise<T> {
        return new Promise<T>((resolve,reject)=>{
            let roomInfo = <any>fakeDataServiceModule.generateRoomInfos();
           
            resolve(roomInfo);
        });
    }

    public loadSessionsViaFirebase<T>(): Promise<T> {
        return new Promise<T>((resolve,reject)=>{

            this._sessionData= new SessionData();
            this._sessionData.getAllSessions()
            .then((result:Array<Session>)=>{
                resolve(<any>result);
            });
            
        });
    }

    public loadSessionsViaFakerAndFirebase<T>(speakers,roomInfos): Promise<T> {
        return new Promise<T>((resolve,reject)=>{
            let sessions = <any>fakeDataServiceModule.generateSessions(speakers,roomInfos);
            resolve(sessions);
        });
    }
    
}