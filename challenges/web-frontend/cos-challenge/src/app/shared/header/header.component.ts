import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cos-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() isLoggedIn: boolean | null = false;

  @Output() logout = new EventEmitter();
}
