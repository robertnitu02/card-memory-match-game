import { Component, Input, OnInit } from '@angular/core';
import { CardModel } from '../../shared/Models/card.model';
import { Difficulty } from '../../shared/Models/table.enum';
import {
  Icons,
  TableDimensionByDifficulty,
} from '../../shared/Models/game.const';

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
  @Input() Difficulty;

  cards: CardModel[] = [];
  tableDifficulty;

  iconsGenerated: string[] = [];

  infoString;
  infoTimerMinutes = 0;
  infoTimerSeconds = 0;

  timer;
  timerValue;

  blockClick = true;
  gameFinished = false;
  cardSelected: CardModel = null;

  constructor() {}

  ngOnInit(): void {
    this.initGame();
  }

  initGame(): void {
    this.generateCards();
    this.timerValue = this.Difficulty === Difficulty.HARD ? 4 : 3;
    this.infoString = `The game will start in.. ${this.timerValue} seconds`;
    this.showCards();
    this.timer = setInterval(() => {
      this.timerValue--;
      let secondsString = `${this.timerValue} second${
        this.timerValue > 1 ? 's' : ''
      }`;
      this.infoString = `The game will start in.. ${secondsString}`;
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
    if (this.cardSelected !== null && selectedCard === this.cardSelected)
      return;
    selectedCard.state = 'active';
    if (this.cardSelected === null) {
      this.cardSelected = selectedCard;
      selectedCard.state = 'active';
    } else {
      if (selectedCard.icon === this.cardSelected.icon) {
        this.blockClick = true;
        setTimeout(() => {
          this.blockClick = false;
        }, 250);
        selectedCard.completed = true;
        this.cardSelected.completed = true;
        selectedCard.state = 'active';
        this.cardSelected.state = 'active';
        this.cardSelected = null;
        if (this.checkGameStatus()) {
          this.gameWon();
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

  gameWon() {
    this.blockClick = true;
    setTimeout(() => {
      this.gameFinished = true;
      this.infoString = `🎆 Congratulations! You finished the game in ${
        this.infoTimerMinutes > 0 ? `${this.infoTimerMinutes} minutes and` : ''
      } ${this.infoTimerSeconds} seconds! 🎆`;
    }, 250);
    clearInterval(this.timer);
    this.timer = undefined;
  }

  checkGameStatus(): boolean {
    return this.cards.find((card) => card.completed === false) === undefined;
  }

  generateCards(): void {
    this.tableDifficulty = TableDimensionByDifficulty[this.Difficulty];
    let generatedValue = this.tableDifficulty * this.tableDifficulty;
    let iconsNeeded = generatedValue / 2;
    while (this.iconsGenerated.length < iconsNeeded) {
      let value = Icons[Math.floor(Math.random() * Icons.length)];
      if (!this.iconsGenerated.find((icon) => icon === value)) {
        this.iconsGenerated.push(value);
      }
    }
    let copyOfIconsGenerated = [...this.iconsGenerated];
    copyOfIconsGenerated.forEach((iconCopy) => {
      this.iconsGenerated.push(iconCopy);
    });
    // console.log(JSON.stringify(this.iconsGenerated));
    this.iconsGenerated.forEach((icon) => {
      this.cards.push({
        icon: icon,
        state: 'inactive',
        completed: false,
      });
    });
    this.shuffle();
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

  shuffle(): void {
    let currentIndex = this.cards.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[currentIndex],
      ];
    }
    // console.log(JSON.stringify(this.cards));
  }

  goBack(): void {
    window.location.reload();
  }
}
