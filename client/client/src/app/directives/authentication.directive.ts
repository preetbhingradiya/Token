import { Directive, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appAuthentication]',
  standalone: true
})
export class AuthenticationDirective {

  constructor() { }

  static authEmitters = new EventEmitter<boolean>();
}
