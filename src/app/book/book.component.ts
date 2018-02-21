import { ChangeDetectionStrategy,Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { Http,Response  } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {NgForm} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BookComponent implements OnInit {
  floors =[]; array:any; rooms =[];rooselect:any; check: string ='';invitedPeople:any;
  start_date: string = '';end_date: string = '';subject: string = '';
  start_time: string = '';end_time: string = '';re: string = '';invites:string='';
  floor: string = '';room: string = '';displayDate:any;message: string='';
  equib = []; availableTags=[];
  Equibments = [];msgs=[];bookedData = [];peoples=[];
  people:any;dates =[];times=[]; SUCCESS:string = '';ERROR:string = '';
  timesForModals = [];rowspan:any;filteredList = [];selected = [];temp=[];
  public elementRef;

  constructor(private http: Http,myElement: ElementRef) {
    this.displayDate = new Date().toLocaleDateString();
    this.onChangeDate(this.displayDate);
    this.getTimesForModals();
    this.getAlluser();
    this.check = 'false';
    this.elementRef = myElement;
  }

  ngOnInit() {
    this.getFloor();
    this.rooselect = 'false';
    this.getEquibment();
  }

  filter() {
    if (this.invites !== ""){
        this.filteredList = this.availableTags.filter(function(el){
            return el.value.toLowerCase().indexOf(this.invites.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList = [];
    }
  }
 
  select(item){
    this.selected.push(item);
    this.invites = '';
    this.filteredList = [];
  }

  remove(item){
    this.selected.splice(this.selected.indexOf(item),1);
  }

  onChange(value){
    this.floor = value;
    let headers = new Headers({ 'Content-Type':'application/json','Accept': 'application/json','Authorization': 'Bearer ' + window.localStorage.getItem('auth_key')});
    let options = new RequestOptions({ headers: headers });
    this.http.get('http://localhost/rest/api/getRooms?id='+value,options).map(res => res.json()).subscribe(room => this.rooms = room);
  }

  getAlluser(){
    let headers = new Headers({ 'Content-Type':'application/json','Accept': 'application/json','Authorization': 'Bearer ' + window.localStorage.getItem('auth_key')});
    let options = new RequestOptions({ headers: headers });
    this.http.get('http://localhost/rest/api/getAlluser',options).map(res => res.json()).subscribe(availableTag => {
      this.availableTags = availableTag;
    });
  } 
  onChangeDate(value){
    let headers = new Headers({ 'Content-Type':'application/json','Accept': 'application/json','Authorization': 'Bearer ' + window.localStorage.getItem('auth_key')});
    let options = new RequestOptions({ headers: headers });
    this.http.get('http://localhost/rest/api/getDatesBySelect?date='+value,options).map(res => res.json()).subscribe(date => {
      this.dates = date;
      this.checkBooking(this.dates[0].day,this.dates[4].day);
    });
    
}
  onRoomChange(value){
    this.room = value;
    this.getTimes();
    this.checkBooking(this.dates[0].day,this.dates[4].day);
    this.rooselect = 'true';
  }

  getTimes(){
    this.times = [
      { start: 9.00, end: 9.30 },
      { start: 9.30, end: 10.00 },
      { start: 10.00, end: 10.30 },
      { start: 10.30, end: 11.00 },
    ];
    return this.times;
  }

  getTimesForModals(){
    this.timesForModals = [
      { start: 9.00, end: 9.30 },
      { start: 9.30, end: 10.00 },
      { start: 10.00, end: 10.30 },
      { start: 10.30, end: 11.00 },
    ];
  }

  checkStatus(start_time,end_time,date){
    
    for (let entry of this.getbooksdata()) {
       if(entry.START_DATE == date && entry.END_DATE == date &&  entry.FLOOR_ID == this.floor && entry.ROOM_ID == this.room){
            if(parseFloat(start_time.toFixed(2)) >= parseFloat(entry.START_TIME) && parseFloat(end_time.toFixed(2)) <= parseFloat(entry.END_TIME)){
              this.invitedPeople = entry.INVITES;
              return 'booked';
            }
        } 
    }
 
  }

 
  getbooksdata(){
    return this.bookedData;
  }

  checkBooking(startDate,endDate){
    let headers = new Headers({ 'Content-Type':'application/json','Accept': 'application/json','Authorization': 'Bearer ' + window.localStorage.getItem('auth_key')});
    let options = new RequestOptions({ headers: headers });
    this.http.get('http://localhost/rest/api/getBookedRoom?floor='+this.floor+'&room='+this.room+'&startDate='+startDate+'&endDate='+endDate,options).map(res => res.json()).subscribe(booked => this.bookedData = booked);
  }

  getEquibment(){
    let headers = new Headers({ 'Content-Type':'application/json','Accept': 'application/json','Authorization': 'Bearer ' + window.localStorage.getItem('auth_key')});
    let options = new RequestOptions({ headers: headers });
    this.http.get('http://localhost/rest/api/getEquibments',options).map(res => res.json()).subscribe(Equibment => this.Equibments = Equibment);
  
  }

  onBtnClick(reqType,date){
    let headers = new Headers({ 'Content-Type':'application/json','Accept': 'application/json','Authorization': 'Bearer ' + window.localStorage.getItem('auth_key')});
    let options = new RequestOptions({ headers: headers });
    this.http.get('http://localhost/rest/api/getDates?reqType='+reqType+'&date='+date,options).map(res => res.json()).subscribe(date => this.dates = date);
  
  }

  getFloor(){
    let headers = new Headers({ 'Content-Type':'application/json','Accept': 'application/json','Authorization': 'Bearer ' + window.localStorage.getItem('auth_key')});
    let options = new RequestOptions({ headers: headers });
    this.http.get('http://localhost/rest/api/getFloors',options).map(res => res.json()).subscribe(floor => this.floors = floor);
  }

 

  openModal(time_start,time_end,date){
     this.start_time = time_start.toFixed(2);
     this.end_time = time_end.toFixed(2);
     this.start_date = date;
     this.end_date = date;
  }


  onSubmitForm(f: NgForm) {
    var formdata = f.value;
    var eq_need = ''; var invite='';
    for(let e of this.Equibments){
      if(this.equib[e.name] == true){
        eq_need+= e.name+',';
      }
    }

    for(let i of this.selected){
      invite+= i+',';
      
    }
    formdata.equib =eq_need ;
    formdata.invites =invite ;
    //console.log(formdata);
    let headers = new Headers({ 'Content-Type':'application/json','Accept': 'application/json','Authorization': 'Bearer ' + window.localStorage.getItem('auth_key')});
      let options = new RequestOptions({ headers: headers });
      this.http.post('http://localhost/rest/api/bookRoom',JSON.stringify(formdata),options).map(res => res.json()).subscribe(msg => {
        this.msgs = msg;
        if(this.msgs['SUCCESS']){
          this.SUCCESS = this.msgs['SUCCESS'];
          this.onChangeDate(this.dates[0].day);
        }else{
          this.ERROR = this.msgs['ERROR'];
        }
      
      });
    
    } 

}

