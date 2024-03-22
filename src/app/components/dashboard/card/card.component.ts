import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { Checkin } from 'src/app/model/checkin';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  cards: Checkin[] = [];
  authenticated = false;
  message: any;

  constructor(private chartService: ChartService, private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('http://localhost:1217/api/user', {
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          Emitters.authEmitter.emit((this.authenticated = true));
          this.fetchCards();
        },
        (err) => {
          this.message = 'You are not logged in.';
          Emitters.authEmitter.emit((this.authenticated = false));
        }
      );
  }

  fetchCards() {
    this.chartService.getCheckIns().subscribe(
      (data: Checkin[]) => {
        this.cards = data;
        console.log(this.cards);
      },
      (err) => {
        if (err.status === 500) {
          console.error(err.message);
        } else {
          console.error(err.error.message || err.statusText);
        }
      }
    );
  }
}
