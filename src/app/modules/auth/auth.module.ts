import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignComponent } from './sign/sign.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@NgModule({
  declarations: [SignComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {
  constructor(private authService: AuthService, private router: Router) {
    this.ifTokenRedirectTo();
  }

  ifTokenRedirectTo() {
    if (this.authService.isAdmin()) this.router.navigate(['admin']);
    if (this.authService.isClient()) this.router.navigate(['client']);
  }
}
