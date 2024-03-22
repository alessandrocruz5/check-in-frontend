import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Emitters } from 'src/app/emitters/emitters';
import { Checkin } from 'src/app/model/checkin';
import { ChartService } from 'src/app/services/chart.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  cards: Checkin[] = [];
  authenticated = false;
  message: any;
  displayedCards: Checkin[] = [];

  totalCards = this.cards.length;
  pageSize = 6;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataObs$: Observable<any>;

  constructor(
    private chartService: ChartService,
    private http: HttpClient,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

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
        this.setPagination(this.cards);
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

  setPagination(cards) {
    this.dataSource = new MatTableDataSource<any>(cards);
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataObs$ = this.dataSource.connect();
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    this.displayedCards = this.cards.slice(
      startIndex,
      startIndex + event.pageSize
    );
  }
  // isOwner(checkIn: Checkin): boolean {

  // }
}
