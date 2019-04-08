import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Graph, Node} from 'src/app/graph';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  source:string; 
  destination:string; 
  stationsGraph = new Graph();
  stationsList = new Set();
  stationsText = "";

  constructor(private http : HttpClient){
    this.getData();
  }

  showPath(){
    if(this.source && this.destination){
      this.printPath();
    } else {
      if(this.source){
        alert("Enter destination");
      } else {
        alert("Enter source");
      }
    }
  }

  printPath(){
  }

  getData(){
    this.http.get('http://localhost:4000/url').subscribe(
      (res:any)=>{
        this.stationsText=res.textData;
        this.stationsText.split('\n').forEach((station)=>{  
            let nodeName = station.split(":")[0];
            let node = new Node(nodeName);
  
            if(!this.stationsList.has(nodeName)){
              this.stationsGraph.addNode(node);
              this.stationsList.add(nodeName);
            }
  
            station.split(":")[1].split(",").forEach(edge=>{
              let edgeNode = new Node(edge);
  
              if(!this.stationsList.has(edge)){
                this.stationsGraph.addNode(edgeNode);
                this.stationsList.add(edge);
              }
              node.edges.push(edgeNode);
              });
        });
      },
      (err)=>{console.log("Error in API", err);}
    );
    
    this.stationsGraph.display();
    console.log(this.stationsList);
  }
}
