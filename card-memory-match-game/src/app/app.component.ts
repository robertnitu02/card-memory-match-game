import { Component, OnInit } from '@angular/core';
import { Difficulty } from '../shared/Models/table.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  Difficulty = Difficulty;

  gameStarted = false;
  showDifficulty = false;
  difficultyChosen;

  pageTitle;

  ngOnInit(): void {
    this.pageTitle = '🧠 Card Memory Match Game 🧠';
  }

  choseDifficulty(): void {
    this.pageTitle = '✨Choose Difficulty✨';
    this.showDifficulty = true;
  }

  startGame(difficultyChosen: Difficulty): void {
    this.difficultyChosen = difficultyChosen;
    this.gameStarted = true;
  }
}
