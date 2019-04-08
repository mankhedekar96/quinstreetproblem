import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Dijkstra } from "src/app/graph";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  source: string;
  destination: string;
  stationsGraph: Dijkstra = new Dijkstra();
  stationsList = new Set();
  filteredStationList = [];
  travelStations = [];
  stationsText = "";
  sourceSuggestion: boolean = false;
  destinationSuggestion: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getData();
  }

  /**
	 * This function sets value of field
	 * @param {[string]} field  [source or destination field]
	 * @param {[string]} value [value for the field]
	 */
  setValue(field, value) {
    if (field === "source") {
      this.source = value;
      this.sourceSuggestion = false;
    } else {
      this.destination = value;
      this.destinationSuggestion = false;
    }
  }

  // This is bound to find button and validates the input
  showPath() {
    if (this.source && this.destination) {
      if (this.source != this.destination) {
        this.printPath();
      } else {
        alert("Source and destination is same");
      }
    } else {
      if (this.source) {
        alert("Enter destination");
      } else {
        alert("Enter source");
      }
    }
  }

  // This find out the shortest path between source and destination using Dijkstra's algorithm
  printPath() {
    // First check whether the source or destination is found
    if (
      this.stationsList.has(this.source) &&
      this.stationsList.has(this.destination)
    ) {
      this.travelStations = this.stationsGraph.shortestPath(
        this.source,
        this.destination
      );
    } else {
      if (this.stationsList.has(this.source)) {
        alert("Destination not found ");
      } else {
        alert("Source not found ");
      }
    }
  }

  // This function fetches data from the api
  getData() {
    this.http.get("http://localhost:4000/getStations").subscribe(
      (res: any) => {
        this.stationsText = res.textData; // data from the api
        this.stationsText.split("\n").forEach(station => {
          let name = station.split(":")[0].trim();
          let connectedStations = {};
          station
            .split(":")[1]
            .split(",")
            .forEach(station => {
              this.stationsList.add(station.trim());
              connectedStations[station.trim()] = 1;
            });
          this.stationsList.add(name);
          this.stationsGraph.addVertex(name, connectedStations);
        });
        this.filteredStationList = Array.from(this.stationsList); // Made array list
        this.filteredStationList.sort();
      },
      err => {
        console.log("Error in API", err);
      }
    );
  }
}
