import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [SignupService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  router = inject(Router);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  readonly name = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  readonly confirmPassword = new FormControl('', [
    Validators.required,
    this.matchPassword.bind(this),
  ]);

  matchPassword(control: FormControl): { [key: string]: boolean } | null {
    if (control.value !== this.password.value) {
      return { passwordMismatch: true };
    }
    return null; // Validation passes
  }

  errorMessage = signal('');
  passwordErrorMessage = signal('');
  confirmPasswordErrorMessage = signal('');
  nameErrorMessage = signal('');
  constructor(private signupService: SignupService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
    if (this.password.hasError('required')) {
      this.passwordErrorMessage.set('you must enter a value');
    } else if (this.password.hasError('minlength')) {
      this.passwordErrorMessage.set(
        'password needs to be of minimum 6 characters'
      );
    } else {
      this.passwordErrorMessage.set('');
    }
    // Name Field Validation
    if (this.name.hasError('required')) {
      this.nameErrorMessage.set('You must enter a value for name');
    } else if (this.name.hasError('minlength')) {
      this.nameErrorMessage.set('Name must be at least 3 characters long');
    } else {
      this.nameErrorMessage.set('');
    }

    // Confirm Password Field Validation
    if (this.confirmPassword.hasError('required')) {
      this.confirmPasswordErrorMessage.set(
        'You must enter a value for confirm password'
      );
    } else if (this.confirmPassword.hasError('passwordMismatch')) {
      this.confirmPasswordErrorMessage.set('Passwords do not match');
    } else {
      this.confirmPasswordErrorMessage.set('');
    }
  }
  doSignup() {
    if (
      this.name.valid &&
      this.email.valid &&
      this.password.valid &&
      this.confirmPassword.valid
    ) {
      const data = {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
      };
      this.signupService.doSignUp(data).subscribe((response) => {
        this.router.navigate(['/login']);
      });
    }
  }
}
