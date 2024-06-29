import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  public msgError!: string;
  public msgSuccess!: string;
  public spin: boolean = false;
  formAuth: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientService,
    private router: Router
  ) {
    this.formAuth = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
      confirmPassword: ['', [Validators.required, Validators.min(6)]],
      role: ['', [Validators.required]],
    });

    this.formAuth
      .get('confirmPassword')
      ?.setValidators([
        Validators.required,
        Validators.minLength(6),
        this.matchPasswords.bind(this),
      ]);
  }

  matchPasswords(control: AbstractControl) {
    const password = this.formAuth.get('password')?.value;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  public submitForm() {
    if (this.formAuth.valid) {
      this.spin = true;
    }
  }

  onModalCloseClick(close: boolean) {
    if (close) {
      this.spin = false;
      this.msgError = '';
    }
  }

  onModalSuccessCloseClick(close: boolean) {
    if (close) {
      this.spin = false;
      this.msgSuccess = '';
      this.router.navigate(['auth/login']);
    }
  }
}
