import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../shared/services/demo.service';

@Component({
  selector: 'shitpost-generator-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  confidentialInfo = '';
  isLoading = false;
  constructor(private readonly demoService: DemoService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.demoService.fetchAdminData().subscribe({
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
