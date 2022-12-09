import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../events/events.component';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  constructor(
    private http: HttpClient,
  ) { }

  //This service is used for reading and writing the events data to the json file 
  //running on the local live JSON server --dbserver

  getAllEvents() {
    return this.http.get('http://localhost:3000/events')
  }

  getEvents(eventID: number) {
    return this.http.get('http://localhost:3000/events/' + eventID)
  }

  updateEvent(eventID: number, eventData:Event) {
    return this.http.put('http://localhost:3000/events/' + eventID, eventData)
  }
}
