import { Component, OnInit } from '@angular/core';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';
import { allParticlesOptions } from './options/presets.constant';

@Component({
  selector: 'shitpost-generator-ts-particles',
  templateUrl: './ts-particles.component.html',
  styleUrls: ['./ts-particles.component.css'],
})
export class TsParticlesComponent implements OnInit {
  // https://particles.js.org/docs/index.html
  currentOptions: any = allParticlesOptions[0];

  ngOnInit(): void {
    this.currentOptions =
      allParticlesOptions[
        Math.floor(Math.random() * allParticlesOptions.length)
      ];
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }
}
