import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventServiceService } from '../services/event-service.service';

export interface Event {
  id: number
  name: string,
  availableTickets: number,
  date: string,
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(
    private router: Router,
    private eventService: EventServiceService
  ) { }
  eventsList: Array<Event> = []//data.events

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((response)=>{
      this.eventsList = response as Array<Event>
    })
  }

  bookTicket(eventID:number){
    this.router.navigate(["/bookevent"],
    {
      queryParams : {
        event : eventID
      }
    })
  }

}
