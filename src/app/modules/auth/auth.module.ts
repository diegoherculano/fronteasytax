import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignComponent } from './sign/sign.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SignupComponent } from './signup/signup.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [SignComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxMaskPipe,
    NgxMaskDirective,
    ComponentsModule,
  ],
  providers: [provideNgxMask()],
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
