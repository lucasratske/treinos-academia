import { Component, Input } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

	@Input() name: string;

  constructor(
  ) {
  }

}
