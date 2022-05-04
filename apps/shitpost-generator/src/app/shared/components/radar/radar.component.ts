import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shitpost-generator-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css'],
})
export class RadarComponent implements OnInit {
  displayRadar = false;
  ngOnInit(): void {
    // 25% chance to display the scifi radar
    if (Math.floor(Math.random() * 4) === 1) {
      this.displayRadar = true;
    }
  }
}
