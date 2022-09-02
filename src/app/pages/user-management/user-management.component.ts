import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChatbotService } from '../../services/chatbot.service';
import { Store } from '@ngrx/store';
import { increment, decrement, reset } from '../../redux/action/counter.actions';
import { RecieveMessage, Message } from '../../models/Message'
import { User } from '../../models/User';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  public count: any = 0;
  public isLoggedIn = false;

  messages = new Array<Message>();
  message = new Message();
  user = new User();

  constructor(private store: Store<any>,
    private chatbotService: ChatbotService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser() || new User();
    }
    this.store.dispatch(increment());
    this.store.select('count').subscribe((res) => {
      this.count = res
    });


    this.chatbotService.getMessageHistory(this.user).subscribe((res) => {
      this.mapReceivedMessage(res);
    });
    this.chatbotService.connection.on("ReceiveOneTest", (obj: RecieveMessage) => { this.mapReceivedMessage(obj); });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  public mapReceivedMessage(obj: RecieveMessage): void {
    if (obj.isFirstLoad) {
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
      });
    }
    // console.log(obj);
  }

}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
