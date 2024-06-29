import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
      cpf: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.min(3)]],
      confirmPassword: ['', [Validators.required, Validators.min(3)]],
    });

    this.formAuth
      .get('confirmPassword')
      ?.setValidators([
        Validators.required,
        Validators.minLength(3),
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

      this.clienteService.create(this.formAuth.value).subscribe({
        next: (res) => {
          return (this.msgSuccess = 'Cadastro salvo.');
        },
        error: (e) => (this.msgError = e),
      });
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
