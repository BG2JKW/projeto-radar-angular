import { Component } from '@angular/core';
import { AuthService } from './services/auth-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'radar';

  public mostrarMenu: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.authService.mostrarNav.subscribe(
    //   mostrar => this.mostrarMenu = mostrar
    // );
  }
}
