import { Component } from '@angular/core';
import { AuthAppService } from './auth-app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'listadecompra';
  constructor( public authApp: AuthAppService) {}
}
