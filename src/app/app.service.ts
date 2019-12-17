import { Injectable } from '@angular/core';
import {CardInfoModel} from './card/card-info.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  cards$ = new BehaviorSubject<CardInfoModel[]>([]);
  cards: CardInfoModel[];
  private firstNumber = null;
  private secondNumber = null;

  constructor() { }

  initArray(min, max): number[] {
    const initialArray = [];
    for (let i = min; i <= max; i++) {
      initialArray.push(i);
    }
    return initialArray;
  }

  createArray(size, min, max): CardInfoModel[] {
    const initialArray = this.initArray(min, max);
    const numbers = [];
    for (let i = 1; i <= size / 2; i++) {
      const randomIndex = Math.floor(Math.random() * initialArray.length);
      const randomNumber = initialArray.splice(randomIndex, 1);
      const cardInfo = {num: randomNumber[0], isTheSame: false, isOpened: true};
      numbers.push(cardInfo, cardInfo);
    }
    return numbers;
  }

  hideCards(): void {
    for (const item of this.cards) {
      item.isOpened = false;
    }
    this.cards$.next(this.cards);
  }

  mixArray(arr): CardInfoModel[] {
    let j;
    let temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  getNumbersArray(size, min, max): void {
    this.cards = this.mixArray(this.createArray(size, min, max));
    this.cards$.next(this.cards);
  }

  onCardClick(value, i) {
    this.cards = JSON.parse(JSON.stringify(this.cards));
    this.cards[i].isOpened = true;
    this.cards$.next(this.cards);
    if (this.firstNumber) {
      this.secondNumber = {value, i};
    } else {
      this.firstNumber = {value, i};
    }

    if (this.firstNumber && this.secondNumber) {
      if (this.compareNumbers(this.firstNumber.value, this.secondNumber.value)) {
        this.cards[this.firstNumber.i].isTheSame = true;
        this.cards[this.secondNumber.i].isTheSame = true;
        this.cards$.next(this.cards);
        this.firstNumber = null;
        this.secondNumber = null;
      } else {
        setTimeout(() => {
          this.cards[this.firstNumber.i].isOpened = false;
          this.cards[this.secondNumber.i].isOpened = false;
          this.cards$.next(this.cards);
          this.firstNumber = null;
          this.secondNumber = null;
        }, 500);
      }
    }
  }

  compareNumbers(first, second): boolean {
    return first === second;
  }
}
