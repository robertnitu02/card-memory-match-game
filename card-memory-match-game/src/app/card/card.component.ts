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

  infoString;
  infoTimerMinutes = 0;
  infoTimerSeconds = 0;

  timer;
  timerValue;

  blockClick = true;
  cardSelected: CardModel = null;

  constructor() {}

  ngOnInit(): void {
    this.generateCards();
  }

  generateCards(): void {
    this.cards = [
      {
        icon: '👻',
        state: 'inactive',
        completed: false,
      },
      {
        icon: '🧶',
        state: 'inactive',
        completed: false,
      },
      {
        icon: '🦷',
        state: 'inactive',
        completed: false,
      },
      {
        icon: '🤳🏻',
        state: 'inactive',
        completed: false,
      },
      {
        icon: '🥃',
        state: 'inactive',
        completed: false,
      },
      {
        icon: '🗺',
        state: 'inactive',
        completed: false,
      },
      {
        icon: 'a',
        state: 'inactive',
        completed: false,
      },
      {
        icon: 'b',
        state: 'inactive',
        completed: false,
      },
      {
        icon: '👻',
        state: 'inactive',
        completed: false,
      },
      {
        icon: '🧶',
        state: 'inactive',
        completed: false,
      },
      {
        icon: '🦷',
        state: 'inactive',
        completed: false,
      },
      {
        icon: '🤳🏻',
        state: 'inactive',
        completed: false,
      },
      {
        icon: '🥃',
        state: 'inactive',
        completed: false,
      },
      {
        icon: '🗺',
        state: 'inactive',
        completed: false,
      },
      {
        icon: 'a',
        state: 'inactive',
        completed: false,
      },
      {
        icon: 'b',
        state: 'inactive',
        completed: false,
      },
    ];
    this.infoString = 'The game will start in.. 3 seconds';
    this.timerValue = 3;
    this.showCards();
    this.timer = setInterval(() => {
      this.timerValue--;
      this.infoString = `The game will start in.. ${this.timerValue} seconds`;
      if (this.timerValue === 0) {
        this.blockClick = false;
        clearInterval(this.timer);
        this.timer = undefined;
        this.hideCards();
        this.prepareTimer();
      }
    }, 1000);
  }

  toggleFlip(selectedCard: CardModel) {
    if (this.blockClick || selectedCard.completed) return;
    selectedCard.state = 'active';
    if (this.cardSelected === null) {
      this.cardSelected = selectedCard;
      selectedCard.state = 'active';
    } else {
      if (selectedCard.icon === this.cardSelected.icon) {
        selectedCard.completed = true;
        this.cardSelected.completed = true;
        selectedCard.state = 'active';
        this.cardSelected.state = 'active';
        this.cardSelected = null;
        if (this.checkGameStatus()) {
          // TODO win
        }
      } else {
        this.blockClick = true;
        setTimeout(() => {
          this.cardSelected.state =
            this.cardSelected.state === 'inactive' ? 'active' : 'inactive';
          selectedCard.state =
            selectedCard.state === 'inactive' ? 'active' : 'inactive';
          this.cardSelected = null;
          this.blockClick = false;
        }, 750);
      }
    }
  }

  prepareTimer(): void {
    this.infoString = 'Time: 00:00';
    this.infoTimerMinutes = 0;
    this.infoTimerSeconds = 0;
    this.timer = setInterval(() => {
      this.infoTimerSeconds++;
      if (this.infoTimerSeconds === 60) {
        this.infoTimerMinutes++;
        this.infoTimerSeconds = 0;
      }
      this.infoString = `Time: ${
        this.infoTimerMinutes < 10
          ? '0' + this.infoTimerMinutes
          : this.infoTimerMinutes
      }:${
        this.infoTimerSeconds < 10
          ? '0' + this.infoTimerSeconds
          : this.infoTimerSeconds
      }`;
    }, 1000);
  }

  showCards(): void {
    this.cards.forEach((card) => {
      card.state = 'active';
    });
  }

  hideCards(): void {
    this.cards.forEach((card) => {
      card.state = 'inactive';
    });
  }

  checkGameStatus(): boolean {
    let status = true;
    this.cards.forEach((card) => {
      if (card.completed === false) status = false;
    });
    return status;
  }
}
