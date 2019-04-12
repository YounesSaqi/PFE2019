import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-acceuill',
  templateUrl: './page-acceuill.component.html',
  styleUrls: ['./page-acceuill.component.css']
})
export class PageAcceuillComponent implements OnInit {
  session:string;

  constructor() { }

  ngOnInit() {
    this.session=localStorage.getItem('isLoggedIn');
  }

}
