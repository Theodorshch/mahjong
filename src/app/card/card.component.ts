import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() num: number;
  @Input() isOpened: boolean;
  @Input() isTheSame: boolean;


  constructor() { }

  ngOnInit() {
  }

}
