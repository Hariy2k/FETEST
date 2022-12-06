import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('menuHamburger') menuHamburger!: ElementRef
  @ViewChild('navLinks') navLinks!: ElementRef
 
constructor() { }

ngOnInit(): void {

}

toggle(){
  this.navLinks.nativeElement.classList.toggle('mobile-menu')
}

}
