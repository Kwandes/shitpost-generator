import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../shared/services/demo.service';

@Component({
  selector: 'shitpost-generator-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  confidentialInfo = '';
  isLoading = false;
  constructor(private readonly demoService: DemoService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.demoService.fetchUserData().subscribe({
      next: (response) => {
        this.confidentialInfo = response.message;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
}
