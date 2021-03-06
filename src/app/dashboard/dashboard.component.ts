import { Component, OnInit } from "@angular/core";
import { CoronaserviceService } from "src/app/coronaservice.service";
import Chart from "chart.js/auto";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  title = "covidreport";
  countries: any;
  country: string;
  confirmed: number;
  recovered: number;
  deaths: number;
  myChart: any;
  noData: number;
  value:number;

  constructor(private corona: CoronaserviceService) {}

  currentlyConfirmed: any;
  currentlyRecovered: number[];
  currentlyDeath: number[];

  ngOnInit(): void {
    this.corona.getCountries().subscribe((data) => {
      console.log(data);
      this.countries = data;
    });
    this.getDailyData();
  }

  getCountry(country: string) {
    this.country = country;
  }
  getTheData() {
    this.corona.getCoronaCurrentData(this.country).subscribe((data) => {
       if (data.length == 0) {
         console.log("no data");
       } else {
        var index = data.length - 1;
        this.confirmed = data[index].Confirmed;
        this.recovered = data[index].Recovered;
        this.deaths = data[index].Deaths;
      }
    });
  }


  getData() {
    this.getTheData();
    this.getDailyData();
  }

  getDailyData() {
    this.corona.getCoronaCurrentData(this.country).subscribe((data) => {
      if (data.length == 0) {
        console.log("no data");
      } else {
      var index = data.length - 1;
      this.currentlyConfirmed = data[index].Confirmed;
      this.currentlyRecovered = data[index].Recovered;
      this.currentlyDeath = data[index].Deaths;}
       
     if(this.myChart != undefined)this.myChart.destroy();

      this.myChart = new Chart("myChart", {
      
        type: "bar",
        data: {
          labels: ["confirmed", "recovered", "death"],
          datasets: [
            {
              label: "Covid Data",
              data: [
                this.currentlyConfirmed,
                this.currentlyRecovered,
                this.currentlyDeath,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
              ],
              borderWidth: 1,
            },
          ],
        },
      });
    });
  }


}
