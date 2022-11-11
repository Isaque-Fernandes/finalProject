import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'finalProject';

  constructor(private router: Router) { }

  toList() {
    this.router.navigate(["online-store/list"]);
  }

  toCreate() {
    this.router.navigate(["online-store/create"]);
  }

  // toUpdate() {
  //   this.router.navigate(["online-store/edit"]);
  // }

}
