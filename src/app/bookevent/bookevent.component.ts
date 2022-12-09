import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Event } from '../events/events.component';
import { EventServiceService } from '../services/event-service.service';

@Component({
  selector: 'app-bookevent',
  templateUrl: './bookevent.component.html',
  styleUrls: ['./bookevent.component.css']
})
export class BookeventComponent implements OnInit {

  bookingForm!: FormGroup;
  selectedEvent!: Event
  selectedEventID!: number
  selectedNoOfSeats = 0
  submitted = false;
  isSeatsLimitReached = false;
  isCountValidated = false;
  eventsList: Array<Event> = []//data.events

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventService: EventServiceService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedEventID = params['event']
      //Below line used while reading from live JSON server - events-service.ts
      // this.eventService.getEvents(this.selectedEventID).subscribe((response) => {
      //   this.selectedEvent = response as Event
      // })

      //Below line used for reading from localstorage
      this.eventsList = JSON.parse(localStorage.getItem('events')!)
      this.selectedEvent = this.eventsList[this.selectedEventID - 1]
    })
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      fullName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')]),
      noofSeats: new FormControl(this.selectedNoOfSeats, [Validators.required, Validators.min(1)]),
      attendees: this.fb.array([]),
    });
  }

  changeSeats(e: any) {
    this.selectedNoOfSeats = e.target.value
    if ((this.selectedNoOfSeats) > this.selectedEvent.availableTickets) {
      this.isSeatsLimitReached = true
    } else {
      this.isSeatsLimitReached = false
    }
    return this.isSeatsLimitReached
  }

  attendees(): FormArray {
    return this.bookingForm.get("attendees") as FormArray
  }

  newAttendee(): FormGroup {
    return this.fb.group({
      attendeeName: new FormControl('', [Validators.required]),
    })
  }

  addAttendee() {
    let count = (this.attendees()).length
    if (count < 6 && count < (this.selectedNoOfSeats)) {
      this.attendees().push(this.newAttendee());
      this.isCountValidated = true
    } else {
      this.isCountValidated = false
    }
  }

  removeQuantity(i: number) {
    this.attendees().removeAt(i);
  }

  onSubmit() {
    console.log(this.bookingForm);
    this.submitted = true;
    if (this.bookingForm.invalid || this.validateAtendeesCount()) {
      return;
    } else {
      this.updateEventData()
    }
  }

  updateEventData() {
    //Below line used while updating on live JSON server - events-service.ts
    // this.selectedEvent.availableTickets = this.selectedEvent.availableTickets - this.selectedNoOfSeats
    // this.eventService.updateEvent(this.selectedEventID, this.selectedEvent).pipe(first()).subscribe({
    //   next: (res) => {
    //     console.log('update', res)
    //     alert('Booking Success, redirecting to Events page..')
    //     this.router.navigate(["/events"])
    //   },
    //   error: (error) =>{
    //     alert('Booking Failed for unkown reason')
    //     console.log(error)
    //   },
    //   complete: ()=>{
    //     console.log('complete')
    //   }
    // })

    //Below line used for updating to localstorage
    this.selectedEvent.availableTickets = this.selectedEvent.availableTickets - this.selectedNoOfSeats
    this.eventsList[this.selectedEventID - 1] = this.selectedEvent
    localStorage.setItem('events', JSON.stringify(this.eventsList))
    alert('Booking Success, redirecting to Events page..')
    this.router.navigate(["/events"])
  }

  validateAtendeesCount() {
    let result = false
    if ((this.selectedNoOfSeats) === (this.attendees()).length) {
      result = true
    }
    return result
  }

  get f() { return this.bookingForm.controls; }

  onReset() {
    this.submitted = false;
    this.bookingForm.reset();
    this.router.navigate(["/events"])
  }
}
