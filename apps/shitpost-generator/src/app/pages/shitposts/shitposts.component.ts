import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IShitpost } from '@shitpost-generator/interfaces';
import { ShitpostsService } from '../../shared/services/shitposts.service';

@Component({
  selector: 'shitpost-generator-shitposts',
  templateUrl: './shitposts.component.html',
  styleUrls: ['./shitposts.component.css'],
})
export class ShitpostsComponent implements OnInit {
  shitposts: IShitpost[] = [];
  currentShitpost?: IShitpost = undefined;
  isLoading = false;
  constructor(private readonly shitpostsService: ShitpostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.shitpostsService.getAll().subscribe({
      next: (response) => {
        this.shitposts = response;
        this.gibRandomShitpost();
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  gibRandomShitpost(): void {
    this.currentShitpost =
      this.shitposts[Math.floor(Math.random() * this.shitposts.length)];
  }
}
