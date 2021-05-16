import { Component, OnInit } from '@angular/core';
import { CoronaserviceService } from 'src/app/coronaservice.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  title = 'covidreport';
  countries: string;
  country: string;
  confirmed: number;
  recovered: number;
  deaths: number;
  myChart: any;

  constructor(private corona: CoronaserviceService) {}

  currentlyConfirmed: number[] = [];
  currentlyRecovered: number[] = [];
  currentlyDeath: number[] = [];

  ngOnInit(): void {
    this.corona.getCountries().subscribe((data) => {
      console.log(data);
      this.countries = data;
    });
    this.getData();
   // this.map();
  }

  getCountry(country: string) {
    this.country = country;
  }

  getTheData() {
    this.corona.getCoronaCurrentData(this.country).subscribe((data) => {
      console.log(data);
      const index = data.length - 1;
      this.confirmed = data[index].Confirmed;
      this.recovered = data[index].Recovered;
      this.deaths = data[index].Deaths;
    });
  }

  getDailyData() {
    this.corona.getCoronaCurrentData(this.country).subscribe((data) => {
      var index = data.length - 1;
      this.currentlyConfirmed.push(data[index].Confirmed);
      this.currentlyRecovered.push(data[index].Deaths);
      this.currentlyDeath.push(data[index].Recovered);
    });
  }

  getData() {
    this.getTheData();
    this.map();
    this.getDailyData();

 //  if (this.myChart != undefined) this.myChart.destroy();
    
  }
  

  map() {
    
    const labels = ['confirmed', 'recovered', 'death'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: ' Covid Data',
          data: [
            this.currentlyConfirmed,
            this.currentlyDeath,
            this.currentlyRecovered,
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
          ],
          borderWidth: 1,
        },
      ],
    };
    if (this.myChart != undefined) this.myChart.destroy();
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: data,
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
  }
}
