import { Component, OnInit } from '@angular/core';
import { LoremIpsum } from 'lorem-ipsum';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  description = '';

  constructor() {
    this.generateDescription();
  }

  ngOnInit() {
  }

  generateDescription() {
    const lorem = new LoremIpsum();
    this.description = lorem.generateParagraphs(5);
  }

}
