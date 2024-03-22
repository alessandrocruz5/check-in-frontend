import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions } from 'chart.js/auto';
import { Emitters } from 'src/app/emitters/emitters';
import { Checkin } from 'src/app/model/checkin';
import { DateChart } from 'src/app/model/datechart';
import { TagChart } from 'src/app/model/tagchart';
import { TagDateChart } from 'src/app/model/tagdatechart';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  authenticated = false;

  constructor(
    private chartService: ChartService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  tagData: TagChart[] = [];
  dateData: DateChart[] = [];
  tagDateData: TagDateChart[] = [];

  ngOnInit(): void {
    this.http
      .get('http://localhost:1217/api/user', {
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          Emitters.authEmitter.emit((this.authenticated = true));
          this.getTagData();
          this.getDateData();
          this.getTagDateData();
        },
        (err) => {
          Emitters.authEmitter.emit((this.authenticated = false));
        }
      );
  }

  getTagData() {
    this.chartService.getCheckIns().subscribe((data: any) => {
      this.tagData = data.map((entry) => ({
        name: entry.tag,
        value: entry.hours,
      }));
      console.log(this.tagData);
      this.cdr.detectChanges();
    });
  }

  getDateData() {
    this.chartService.getCheckIns().subscribe((data: any) => {
      this.dateData = data.map((entry) => ({
        name: entry.createdAt,
        value: entry.hours,
      }));
      this.cdr.detectChanges();
    });
  }

  getTagDateData() {
    this.chartService.getCheckIns().subscribe((data: any) => {
      this.tagDateData = data.map((entry) => ({
        name: entry.createdAt,
        series: [{ name: entry.tag, value: entry.hours }],
      }));
      this.cdr.detectChanges();
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
