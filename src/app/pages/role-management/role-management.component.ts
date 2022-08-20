import { Component, OnInit , ViewChild ,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { faPhone , faVideo , faTimes , faPaperclip ,faSmile ,faMicrophone , faX , faMinus , faAngleLeft , faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Message } from '../../models/Message';
import { Store } from '@ngrx/store';
import { increment, decrement, reset } from '../../redux/action/counter.actions';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  public count:any = 0;
  // faPhone = faPhone;
  // faVideo = faVideo;
  // faTimes = faTimes;
  // faPaperclip = faPaperclip;
  // faSmile = faSmile;
  // faMicrophone = faMicrophone;
  // faX = faX;
  // faMinus = faMinus;
  // faAngleLeft = faAngleLeft;
  // faPaperPlane = faPaperPlane;

  constructor(private router: Router,
    private store: Store<any>) { }
  // isShow:boolean = true
  // arrChat:any[] = [];
  // textInput!:string;

  // messages = new Array<Message>();  
  // message = new Message();
  
  

  ngOnInit(): void {
    this.store.dispatch(increment());

    this.store.select('count').subscribe((res)=>{
      this.count = res
    });
  }

  // switchChat(){
  //   this.isShow = !this.isShow;
  //   if(this.isShow){
  //     this.scrollToBottom()
  //   }
  // }

  // onKeydownMessages(event:any){
  //   if (event.key === "Enter") {
  //     this.updateMessages(event.target.value);
  //   }
  // }

  // updateMessages(value:any){
  //   if(!value) return
  //   this.message = new Message()
  //   this.message.personal_id = 2;
  //   this.message.message = value;
  //   this.message.topic = [];
  //   this.message.button_id = null;
  //   this.messages.push(this.message);

  //   if(value.toUpperCase() === "ADMIN"){
  //     this.message = new Message()
  //     this.message.personal_id = 1;
  //     this.message.message = "สวัสดีค่ะ ติดต่อสอบถาม กรุณาเลือกกลุ่ม Support ที่ต้องการได้เลยค่ะ";
  //     this.message.topic = [];
  //     this.message.button_id = null;
  //     this.messages.push(this.message);
  
  //     this.message = new Message()
  //     this.message.personal_id = 1;
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
  //   this.message.personal_id = 2;
  //   this.message.message = value;
  //   this.message.topic = [];
  //   this.message.button_id = null;
  //   this.messages.push(this.message);
    
  //   if(value.toUpperCase() === "DSSC"){
  //     this.message = new Message()
  //     this.message.personal_id = 1;
  //     this.message.message = "รอสักครู่ ระบบกำลังทำการตรวจสอบ...";
  //     this.message.topic = [];
  //     this.message.button_id = null;
  //     this.messages.push(this.message);

  //     this.message = new Message()
  //     this.message.personal_id = 1;
  //     this.message.message = "ก็อปมันกากเกิน";
  //     this.message.topic = [];
  //     this.message.button_id = 2;
  //     this.messages.push(this.message);

  //   }

  //   this.scrollToBottom();
  // }


  // scrollToBottom(): void {
  //   try {
  //     setTimeout(() => {
  //       this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  //     }, 10)
  //   } catch(err) { }                 
  // }


  redirectToLoadingPage(){
    this.router.navigateByUrl("loading");
  }
}
