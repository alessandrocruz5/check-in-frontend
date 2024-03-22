import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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

  totalCards = this.cards.length;
  pageSize = 6;

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

  onDelete(checkInId: string) {
    this.chartService.deleteCheckIn(checkInId).subscribe((res) => {
      this.fetchCards();
      this.cards = this.cards.filter((entry) => entry._id !== checkInId);
      console.log('Deleted successfully.', res),
        (err) => {
          console.error('Error in deletion.', err);
        };
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
  }
  // isOwner(checkIn: Checkin): boolean {

  // }
}
