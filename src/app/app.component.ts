import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) { }
  eventsList: Array<Event> = []//data.events

  ngOnInit(): void {
    //Below line used for setting to localstorage
    this.http.get('../../assets/json/events.json').subscribe((data:any) =>{
      console.log(data.events)
      this.eventsList = data.events as Event[]
      localStorage.setItem('events', JSON.stringify(this.eventsList))
    })
  }
}