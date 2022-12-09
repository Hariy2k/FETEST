import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('menu') menu!: ElementRef
  @ViewChild('menuWrapper') menuWrapper!: ElementRef
  @ViewChild('barAnimation') barAnimation!: ElementRef

  constructor() { }

  ngOnInit(): void {

  }

  closeWrapper() {
    this.menu.nativeElement.classList.remove('demo')
    this.menuWrapper.nativeElement.classList.remove('fullwidth')
    this.barAnimation.nativeElement.classList.remove('active-bar')
  }

}
