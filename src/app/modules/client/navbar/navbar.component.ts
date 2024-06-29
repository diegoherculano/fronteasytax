import { Component, ContentChild, HostListener, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() title!: string;

  isUserMenuOpen: boolean = false;
  isHamburgerMenuOpen: boolean = false;

  constructor(private authService: AuthService) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.isUserMenuOpen) {
      return;
    }

    const target = event.target as HTMLElement;
    if (!target.closest('#profile-dropdown')) {
      this.isUserMenuOpen = false;
    }
  }

  logout() {
    this.authService.logout();
  }
}
