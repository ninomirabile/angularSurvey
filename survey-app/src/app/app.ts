import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DevToolsComponent } from './shared/ui/dev-tools/dev-tools.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DevToolsComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'Angular 20 Survey Builder';
}
