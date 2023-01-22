import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  bar: ChartType = ChartType.Bar;

  constructor() { }
  
  public data = [
    ['Task', 'Hours per Day'],
    ['Work',     11],
    ['Eat',      2],
    ['Commute',  2],
    ['Watch TV', 2],
    ['Sleep',    7]
  ];

  public optionsProdutos = {
    pieSliceText: 'label',
    legend: { position: 'none' },
  };

  public graficoColuna:ChartType = ChartType.PieChart;
  
  ngOnInit(): void {

  }

}
