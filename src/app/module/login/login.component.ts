import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
import { LoginService } from './login.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  errorMessage = signal('');
  passwordErrorMessage = signal('');
  constructor(private loginService: LoginService) {
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
  }

  doLogin() {
    if (this.email.valid && this.password.valid) {
      const data = {
        email: this.email.value,
        password: this.password.value,
      };
      const response = this.loginService.doUserLogin(data);
      console.log(response);
    } else {
      console.log('this failed');
    }
  }
}
