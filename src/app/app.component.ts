import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NavigationComponent, RouterOutlet],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  name = 'Angular';

}
