import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit {
  public _timerInterval: any;
  public _display: any;

  constructor() { }

  ngOnInit(): void {
    let minutes = new Date().getMinutes();
    let roundUp = this.roundUpNearest10(minutes);
    let totalMinute = (roundUp - (minutes + 1)) === 0 ? 9 : (roundUp - (minutes + 1));
    this.timer(totalMinute);
  }

  stop() {
    clearInterval(this._timerInterval);
  }

  roundUpNearest10(num:any) {
    return Math.ceil(num / 10) * 10;
  }

  timer(minute:any) {
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60 - new Date().getSeconds();
    const prefix = minute < 10 ? '0' : '';

    this._timerInterval = setInterval(() => {
      seconds--;
      
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;
      
      if(statSec === 0){
        minute --;
      }
      if (minute === -1) {
        minute = 9;
      }
      
      this._display = `${prefix}${minute}:${textSec}`;
    }, 1000);
  }

  goBack(){
    window.history.back()
  }

}