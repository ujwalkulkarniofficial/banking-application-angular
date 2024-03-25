import { Component } from '@angular/core';
import { User } from './models';
import { UserAccountService } from './services/user-account/user-account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'banking-application';
  user?: User | null;

    constructor(private accountService: UserAccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }
}
