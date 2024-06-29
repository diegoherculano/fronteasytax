import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
})
export class SignComponent {
  public msgError!: string;
  public spin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  public formAuth: FormGroup = this.formBuilder.group({
    cpf: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public submitForm() {
    if (this.formAuth.valid) {
      this.spin = true;
      this.authService
        .signIn({
          cpf: this.formAuth.value.cpf,
          password: this.formAuth.value.password,
        })
        .subscribe({
          next: (res) => res,
          error: (e) => {
            this.msgError = e;
            this.spin = false;
          },
        });
    }
  }
}
