import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {CardInfoModel} from './card/card-info.model';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  cards$: Observable<CardInfoModel[]> = this.commonService.cards$;
  reactiveForm: FormGroup;
  isBlocked;

  private timeout;

  constructor(private commonService: AppService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      size: [8, []],
      minValue: [1, []],
      maxValue: [50, []]
    });
  }

  openCard(num, i): void {
    this.commonService.onCardClick(num, i);
  }

  trackByFn(index, item) {
    return item.num;
  }

  onSubmit() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.isBlocked = true;
    this.commonService.getNumbersArray(this.reactiveForm.value.size, this.reactiveForm.value.minValue, this.reactiveForm.value.maxValue);
    this.timeout = setTimeout(() => {
      this.commonService.hideCards();
      this.isBlocked = false;
    }, 5000);
  }

}
