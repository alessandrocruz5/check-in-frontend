import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  cards: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCards();
  }

  fetchCards() {
    this.http.get<any[]>('http://localhost:1217/api/forms').subscribe(
      (data) => {
        this.cards = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
