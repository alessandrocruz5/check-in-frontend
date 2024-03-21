import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartOptions } from 'chart.js/auto';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  chart: any;

  public chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  public chartLabels: any[] = [];
  public chartType: string = 'bar';
  public chartLegend: boolean = true;
  public chartPlugins: any[] = [];
  public chartData: ChartDataset[] = [];

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chartService.getData().subscribe((data: any) => {
      this.chartLabels = data.map((d: any) => d.createdAt);
      this.chartData = data.map((d: any) => {
        return {};
      });
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
