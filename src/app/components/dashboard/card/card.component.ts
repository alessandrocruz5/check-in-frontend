import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  cards: any[] = [];
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
        },
        (err) => {
          this.message = 'You are not logged in.';
          Emitters.authEmitter.emit((this.authenticated = false));
        }
      );

    this.fetchCards();
  }

  fetchCards() {
    // this.http.get<any[]>('http://localhost:1217/api/forms').subscribe(
    //   (data) => {
    //     this.cards = data;
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
    this.chartService.getData().subscribe((data: any) => {
      this.cards = data;
      console.log(this.cards);
    });
  }
}
