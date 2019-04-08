import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dijkstra } from 'src/app/graph';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  source: string;
  destination: string;
  stationsGraph: Dijkstra = new Dijkstra();
  stationsList = new Set();
  filteredStationList = [];
  travelStations=[];
  stationsText = "";
  sourceSuggestion: boolean = false;
  destinationSuggestion: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(){
    this.getData();
  }

  setValue(field,value){
    if(field==='source'){
      this.source = value;
      this.sourceSuggestion=false;
    }
    else{
      this.destination = value;
      this.destinationSuggestion=false;
    }

  }
  showPath() {
    if (this.source && this.destination) {
      this.printPath();
    } else {
      if (this.source) {
        alert("Enter destination");
      } else {
        alert("Enter source");
      }
    }
  }

  printPath() {
    if (this.stationsList.has(this.source) && this.stationsList.has(this.destination)) {
      console.log(this.stationsGraph.shortestPath(this.source, this.destination));
      this.travelStations = this.stationsGraph.shortestPath(this.source, this.destination);
    } else {
      if (this.stationsList.has(this.source)) {
        alert("Destination not found ");
      } else {
        alert("Source not found ");
      }
    }
  }

  getData() {
    this.http.get('http://localhost:4000/url').subscribe(
      (res: any) => {
        this.stationsText = res.textData;
        this.stationsText.split('\n').forEach((station) => {
          let name = station.split(":")[0].trim();
          let connectedStations = {};

          station.split(":")[1].split(",").forEach(station => {
            this.stationsList.add(station.trim());
            connectedStations[station.trim()] = 1;
          });

          this.stationsList.add(name);
          this.stationsGraph.addVertex(name, connectedStations);
        });

        this.filteredStationList = Array.from(this.stationsList);
        this.filteredStationList.sort();

        console.log(new Set(this.filteredStationList));
      },
      (err) => { console.log("Error in API", err) });
  }
  //"Abrantes", "Plaza Elíptica"
}
