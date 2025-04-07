import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDrawerMode,
  MatSidenav,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import {
  ConfigurableFocusTrapFactory,
  FocusTrapFactory,
} from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../shared/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { TokenServiceService } from '../../core/services/token-service.service';
@Component({
  selector: 'app-gadget',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    MatIconModule,
  ],
  providers: [TokenServiceService],
  templateUrl: './gadget.component.html',
  styleUrl: './gadget.component.css',
})
export class GadgetComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenServiceService
  ) {}
  ngOnInit() {}
  onChildButtonClick() {
    this.sidenav.toggle();
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(
    window.location.host
  );

  navigateTo(targetRoute: string): void {
    this.router.navigate([targetRoute]);
  }
  doLogout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }
}
