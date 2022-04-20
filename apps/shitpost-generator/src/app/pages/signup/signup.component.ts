import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILoginResponse, Role } from '@shitpost-generator/interfaces';
import {
  LocalStorageService,
  LocalStorageVars,
} from '@shitpost-generator/local-storage';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'shitpost-generator-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  /**
   * Small object used to show simple alerts to the user
   */
  alert?: { message: string; type: 'error' | 'info' };
  /**
   * Is set to true when certain actions like pressing the signup button shouldn't be possible due to data loading / waiting for request result.
   */
  isLoading = false;
  /**
   *  The Role enum values broken into strings to be shown in the select element.
   */
  roleArray: string[];
  isLoggedIn = false;

  constructor(
    private readonly authService: AuthService,
    private readonly localStorageService: LocalStorageService
  ) {
    this.roleArray = Object.keys(Role);
  }

  /**
   * Initialize the signup form
   */
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      role: new FormControl(Role.user),
    });
    this.isLoggedIn =
      this.localStorageService.getItem<ILoginResponse>(
        LocalStorageVars.accessTokenInfo
      )?.value != null;
  }

  /**
   *  Sign in the user with the credentials from the form.
   */
  async onSubmit(): Promise<void> {
    if (this.signupEnabled()) {
      console.warn('Tried to submit an invalid/dirty signup form');
      return;
    }
    this.isLoading = true;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const role = this.signupForm.get('role')?.value;
    this.authService
      .register({ email: email, password: password }, role)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.alert = {
            message: `Signed up as ${email}:${password}. Role: ${response.role}`,
            type: 'info',
          };
          this.authService.saveAccessInfo({
            accessToken: response.accessToken,
            role: response.role,
          });
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.isLoading = false;
          this.alert = {
            message: 'Failed to sign up',
            type: 'error',
          };
        },
      });
  }

  /**
   * Check whether the signup forms' state allows logging in.
   * @returns whether it is possible to log in.
   */
  signupEnabled(): boolean {
    return !(
      this.isLoading ||
      (this.signupForm.valid && this.signupForm.dirty)
    );
  }

  /**
   * Allow pressing the log in button by pressing enter while the credentials are valid.
   */
  @HostListener('document:keydown.enter') enterKeyPressed() {
    if (this.signupEnabled()) {
      this.onSubmit();
    }
  }

  getAccessInfo(): ILoginResponse | null {
    return this.authService.getAccessInfo();
  }
}
