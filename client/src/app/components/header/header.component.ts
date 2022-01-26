import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DialogService]
})
export class HeaderComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  id: any;
  ref: DynamicDialogRef | undefined;

  constructor(
    private tokenStorageService: TokenStorageService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
      this.id = user.id;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  showLogin() {
    this.ref = this.dialogService.open(LoginComponent, {
      width: '40%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      dismissableMask: true

    });
    // this.ref.onClose.subscribe((checkshowdialog: boolean) => {
    //   if (checkshowdialog) {
    //       this.reloadPage();
    //   }  
    // });

  }
  showRegister() {
    this.ref = this.dialogService.open(RegisterComponent, {
      width: '40%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      dismissableMask: true

    });
    this.ref.onClose.subscribe((checkshowdialog: boolean) => {
      if (checkshowdialog) {
        this.reloadPage();
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
