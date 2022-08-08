import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../../services/token-storage.service';
import { Message, SendMessage, RecieveMessage, RecieveMessageDetails } from '../../models/Message';
import { User } from '../../models/User';
// import { faCoffee , faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faPhone, faVideo, faTimes, faPaperclip, faSmile, faMicrophone, faX, faMinus, faAngleLeft, faPaperPlane, faSignOut, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ChatbotService } from '../../services/chatbot.service';
import { ScrollToBottomDirective } from '../../services/scroll-to-bottom.directive'
import { DatePipe } from '@angular/common'
// import * as moment from '@angular/moment';

@Component({
  selector: 'app-material-layout',
  templateUrl: './material-layout.component.html',
  styleUrls: ['./material-layout.component.scss']
})
export class MaterialLayoutComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  faPhone = faPhone;
  faVideo = faVideo;
  faTimes = faTimes;
  faPaperclip = faPaperclip;
  faSmile = faSmile;
  faMicrophone = faMicrophone;
  faX = faX;
  faMinus = faMinus;
  faAngleLeft = faAngleLeft;
  faPaperPlane = faPaperPlane;
  faSignOut = faSignOut;
  faTriangleExclamation = faTriangleExclamation;

  public loading?: boolean;
  public isAuthenticated?: boolean;
  public title?: string;

  public isBypass?: boolean;
  public mobile?: boolean;
  public isMenuInitOpen?: boolean;
  public dateNow: Date = new Date();
  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    private _snackBar: MatSnackBar,
    private tokenStorageService: TokenStorageService,
    public chatbotService: ChatbotService,
    public datepipe: DatePipe) { }


  private sidenav?: MatSidenav;

  public isMenuOpen = true;
  public contentMargin = 240;
  isLoggedIn = false;
  isShow: boolean = true
  textInput!: string;

  messages = new Array<Message>();
  message = new Message();

  user = new User();
  count: number = 0;
  get isHandset(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Handset);
  }

  ngOnInit() {
    this.isMenuOpen = true;  // Open side menu by default
    this.title = 'SCG Web Claim';
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.messages = this.chatbotService.messageShare;
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser() || new User();
    }

    if (!this.chatbotService.checkObservedIsExisting()) {
      this.chatbotService.retrieveMappedObject().subscribe((receivedObj: RecieveMessage) => { this.addToInbox(receivedObj); });  // calls the service method to get the new messages sent
    }



    // this.router.events.subscribe(() => {
    //   this.scrollToBottom()
    // });
  }

  ngDoCheck() {
    if (this.isHandset) {
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true;
    }
  }

  onResize(event: any) {
    event.target.innerWidth;
  }


  public openSnackBar(msg: string): void {
    this._snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'notif-error'
    });
  }

  public onSelectOption(option: any): void {
    const msg = `Chose option ${option}`;
    this.openSnackBar(msg);

    /* To route to another page from here */
    // this.router.navigate(['/home']);
  }

  public logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  onKeydownMessages(event: any) {
    if (event.key === "Enter") {
      this.sendMessage(event.target.value);
    }
  }

  // updateMessages(value:any){
  //   if(!value) return
  //   this.message = new Message()
  //   this.message.user_id = 2;
  //   this.message.message = value;
  //   this.message.topic = [];
  //   this.message.button_id = null;
  //   this.messages.push(this.message);

  //   if(value.toUpperCase() === "ADMIN"){
  //     this.message = new Message()
  //     this.message.user_id = 1;
  //     this.message.message = "สวัสดีค่ะ ติดต่อสอบถาม กรุณาเลือกกลุ่ม Support ที่ต้องการได้เลยค่ะ";
  //     this.message.topic = [];
  //     this.message.button_id = null;
  //     this.messages.push(this.message);

  //     this.message = new Message()
  //     this.message.user_id = 1;
  //     this.message.message = "";
  //     this.message.topic = [ "DSSC" , "SCG_PARTNER" , "อื่นๆ"];
  //     this.message.button_id = 1;
  //     this.messages.push(this.message);

  //   }

  //   this.scrollToBottom();
  //   this.textInput = "";
  // }

  // answerQuestion(value:any){

  //   this.message = new Message()
  //   this.message.user_id = 2;
  //   this.message.message = value;
  //   this.message.topic = [];
  //   this.message.button_id = null;
  //   this.messages.push(this.message);

  //   if(value.toUpperCase() === "DSSC"){
  //     this.message = new Message()
  //     this.message.user_id = 1;
  //     this.message.message = "รอสักครู่ ระบบกำลังทำการตรวจสอบ...";
  //     this.message.topic = [];
  //     this.message.button_id = null;
  //     this.messages.push(this.message);

  //     this.message = new Message()
  //     this.message.user_id = 1;
  //     this.message.message = "ก็อปมันกากเกิน";
  //     this.message.topic = [];
  //     this.message.button_id = 2;
  //     this.messages.push(this.message);

  //   }

  //   this.scrollToBottom();
  // }

  answerQuestion(value: any) {
    if (this.user.user_type !== "DSSC") {
      this.sendMessage(value, true);
    }
  }

  sendMessage(value: any, isPressEvent: boolean = false): void {
    if (value) {
      this.count = 0;
      let send = new SendMessage();
      this.dateNow = new Date();
      var dateNowString = new Date().toLocaleString()
      let dateNowStrings = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

      send.UserId = this.user.user_id;
      send.Message = value;
      send.Type = "sent";
      send.UserType = this.user.user_type;
      send.IsPressTopic = isPressEvent;
      send.TimeStamp = new Date(dateNowString);
      send.TimeStampString = dateNowStrings ?? "";

      this.message = new Message();
      this.message.user_id = this.user.user_id;
      this.message.user_type = this.user.user_type;
      this.message.type = "sent";
      this.message.message = value;
      this.message.time_stamp = this.dateNow;

      let checkDate = this.messages[this.messages.length - 1]
      var date = new Date(checkDate?.time_stamp?.toString() ?? "")

      if (date.getDate() == this.dateNow.getDate() &&
        date.getMinutes() == this.dateNow.getMinutes() &&
        checkDate.user_type == this.user.user_type) {
        this.messages[this.messages.length - 1].time_stamp = null;
      }
      this.message.time_stamp = this.dateNow;
      this.textInput = "";

      if (this.chatbotService.checkConnectionStatus()) {
        this.messages.push(this.message);
        this.chatbotService.broadcastMessage(send);
      } else {
        this.message = new Message();
        this.message.user_id = this.user.user_id;
        this.message.user_type = this.user.user_type;
        this.message.type = "sent";
        this.message.message = value;
        this.message.time_stamp = this.dateNow;
        this.message.is_connection_lose = true;

        this.messages.push(this.message);
        this.scrollToBottom()
      }
    }

  }


  addToInbox(obj: RecieveMessage) {
    if (obj.isFirstLoad) {
      this.count++;
      this.messages = new Array<Message>();
      obj.lists.forEach((element, index) => {
        this.message = new Message();
        this.message.user_id = obj.userId;
        this.message.user_type = element.userType;
        this.message.button_id = element.buttonId;
        this.message.message = element.message;
        this.message.topic = element.topic;
        this.message.type = element.type;
        this.message.time_stamp = element.timeStamp;
        this.message.is_ShowDay = true;
        if (this.messages.length > 1) {
          var checkDate = this.messages[this.messages.length - 1];
          var date1 = new Date(checkDate?.time_stamp?.toString() ?? "")
          var date2 = new Date(element.timeStamp?.toString() ?? "")
          if (date1.getDate() == date2.getDate() &&
            date1.getMinutes() == date2.getMinutes() &&
            checkDate.user_type == this.message.user_type) {
            this.messages[this.messages.length - 1].time_stamp = null;
          }
          if (date1.getDay() === date2.getDay() && date1.getMonth() === date2.getMonth()) {
            this.message.is_ShowDay = false;
          }

        }

        this.messages.push(this.message);
        // this.chatbotService.messageShare = this.messages;
        // this.scrollToBottom()
      });
    } else if (obj.userId !== this.user.user_id) {
      obj.lists.forEach((element, index) => {
        this.message = new Message();
        this.message.user_id = obj.userId;
        this.message.user_type = index == 0 ? obj.userType : "DSSC";
        this.message.button_id = element.buttonId;
        this.message.message = element.message;
        this.message.topic = element.topic;
        this.message.type = index == 0 ? "received" : "sent";
        this.message.time_stamp = element.timeStamp;
        this.message.is_ShowDay = true;
        if (this.messages.length > 1) {
          var checkDate = this.messages[this.messages.length - 1];
          var date1 = new Date(checkDate?.time_stamp?.toString() ?? "")
          var date2 = new Date(element.timeStamp?.toString() ?? "")
          if (date1.getDate() == date2.getDate() &&
            date1.getMinutes() == date2.getMinutes() &&
            checkDate.user_type == this.message.user_type) {
            this.messages[this.messages.length - 1].time_stamp = null;
          }

          if (date1.getDay() === date2.getDay() && date1.getMonth() === date2.getMonth()) {
            this.message.is_ShowDay = false;
          }
        }


        this.messages.push(this.message);
        // this.chatbotService.messageShare = this.messages;
        // this.scrollToBottom()
      });
    } else {
      obj.lists.forEach((element, index) => {
        if (index !== 0) {
          this.message = new Message();
          this.message.user_id = obj.userId;
          this.message.user_type = index == 0 ? obj.userType : "DSSC";
          this.message.button_id = element.buttonId;
          this.message.message = element.message;
          this.message.topic = element.topic;
          this.message.type = "received";
          this.message.time_stamp = element.timeStamp;
          this.message.is_ShowDay = true;

          if (this.messages.length > 1) {
            var checkDate = this.messages[this.messages.length - 1];
            var date1 = new Date(checkDate?.time_stamp?.toString() ?? "")
            var date2 = new Date(element.timeStamp?.toString() ?? "")
            if (date1.getDate() == date2.getDate() &&
              date1.getMinutes() == date2.getMinutes() &&
              checkDate.user_type == this.message.user_type) {
              this.messages[this.messages.length - 1].time_stamp = null;
            }


          }
          this.messages.push(this.message);
          // this.chatbotService.messageShare = this.messages;
          // this.scrollToBottom()
        }
        this.messages[this.messages.length - 1].is_ShowDay = true;

        if (this.messages.length == 1) return

        var date2 = new Date(element.timeStamp?.toString() ?? "")
        const result = this.messages.filter(s => s.time_stamp).sort((objA, objB) => new Date(objB.time_stamp ?? "").getTime() - new Date(objA.time_stamp ?? "").getTime());

        if (new Date(result[1].time_stamp ?? "").getDate() === date2.getDate() && new Date(result[1].time_stamp ?? "").getMonth() === date2.getMonth()) {
          this.messages[this.messages.length - 1].is_ShowDay = false;
        }

      });
    }
    if (this.messages.length >= this.chatbotService.messageShare.length) {
      this.chatbotService.messageShare = this.messages;
    }
    this.scrollToBottom()
  }

  switchChat() {
    this.chatbotService.isShowChat = !this.chatbotService.isShowChat;
    if (this.chatbotService.isShowChat) {
      this.scrollToBottom()
    }
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        if (this.myScrollContainer?.nativeElement?.scrollHeight) {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer?.nativeElement?.scrollHeight;
        }
      }, 10)
    } catch (err) { }
  }

}
