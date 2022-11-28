import { Component, OnInit } from '@angular/core';
import { CardModel } from '../../shared/Models/card.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('flipState', [
      state(
        'active',
        style({
          transform: 'rotateY(179deg)',
        })
      ),
      state(
        'inactive',
        style({
          transform: 'rotateY(0)',
        })
      ),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in')),
    ]),
  ],
})
export class CardComponent implements OnInit {
  cards: CardModel[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generateCards();
  }

  generateCards(): void {
    this.cards = [
      {
        icon: '👻',
        state: 'inactive',
      },
      {
        icon: '🧶',
        state: 'inactive',
      },
      {
        icon: '🦷',
        state: 'inactive',
      },
      {
        icon: '🤳🏻',
        state: 'inactive',
      },
      {
        icon: '🥃',
        state: 'inactive',
      },
      {
        icon: '🗺',
        state: 'inactive',
      },
      {
        icon: 'a',
        state: 'inactive',
      },
      {
        icon: 'b',
        state: 'inactive',
      },
      {
        icon: '👻',
        state: 'inactive',
      },
      {
        icon: '🧶',
        state: 'inactive',
      },
      {
        icon: '🦷',
        state: 'inactive',
      },
      {
        icon: '🤳🏻',
        state: 'inactive',
      },
      {
        icon: '🥃',
        state: 'inactive',
      },
      {
        icon: '🗺',
        state: 'inactive',
      },
      {
        icon: 'a',
        state: 'inactive',
      },
      {
        icon: 'b',
        state: 'inactive',
      },
    ];
  }

  toggleFlip(selectedCard: CardModel) {
    selectedCard.state =
      selectedCard.state === 'inactive' ? 'active' : 'inactive';
  }
}
