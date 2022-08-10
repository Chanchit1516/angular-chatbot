import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { Message } from '../models/Message';
import { Observable, Subject } from 'rxjs';
import { RecieveMessage } from '../models/Message'
import { map } from 'rxjs/operators';
import { NavigationStart, Router , NavigationEnd } from '@angular/router';

import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private connection: any = new signalR.HubConnectionBuilder().withUrl("https://localhost:44369/chatsocket") // mapping to the chathub as in startup.cs
    .configureLogging(signalR.LogLevel.Information)
    .build();

  readonly POST_URL = "https://localhost:44369/api/Chatbot"

  // private receivedMessageObject: RecieveMessage = new RecieveMessage();
  private sharedObj = new Subject<RecieveMessage>();
  isLoggedIn = false;
  user = new User();
  ConnectionStarted  = false;
  public messageShare: Message[] = [];
  public isShowChat = true;
  public connectionIdShare:any = "";


  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private router: Router) {
    this.connection.onclose(async () => {
      this.ConnectionStarted = false;
      await this.start();
    });
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser() || new User();
    }
    this.connection.on("ReceiveOne", (obj: RecieveMessage) => { this.mapReceivedMessage(obj); });
    this.start();
  }

  // Strart the connection
  public async start() {
    try {
      await this.connection.start();
      this.getConnectionId();
      this.getMessageHistory(this.user).subscribe((res) => {
        this.mapReceivedMessage(res);
      });
      this.ConnectionStarted = true;
      console.log("connected");
    } catch (err) {
      this.ConnectionStarted = false;
      console.log(err);
      setTimeout(() => {
        this.start()
        this.getMessageHistory(this.user).subscribe((res) => {
          this.mapReceivedMessage(res);
        });
      }, 5000);
    }
  }

  public mapReceivedMessage(obj: RecieveMessage): void {
    this.sharedObj.next(obj);
  }

  // public getMessageHistory(user: any) {
  //   this.http.get(this.POST_URL + `?UserId=${user.user_id}&UserType=${user.user_type}`).subscribe((data: RecieveMessage) => {


  //   })
  // }

  public getMessageHistory(user: any): Observable<any> {
    let API_URL = `${this.POST_URL}/GetChatHistoryById?UserId=${user.user_id}&UserType=${user.user_type}`;
    return this.http.get(`${API_URL}`).pipe(
      map((res: any) => {
        return res || {};
      })
    );
  }

  public getConnectionId() :void{
    this.connection.invoke('GetConnectionId')
   .then((connectionId:string) => {
      this.connectionIdShare = connectionId
      // alert(connectionId);
      // this.connectionIdShare = connectionId;
   })
  }
  
  // Calls the controller method
  public broadcastMessage(msgDto: any) {
    this.http.post(this.POST_URL + "/SendRequest", msgDto).subscribe(data => console.log(data));
  }

  public retrieveMappedObject(): Observable<RecieveMessage> {
    return this.sharedObj.asObservable();
  }

  public checkObservedIsExisting() :boolean{
    return this.sharedObj.observed
  }

  public checkConnectionStatus() :boolean{
    return this.ConnectionStarted;
  }

}
