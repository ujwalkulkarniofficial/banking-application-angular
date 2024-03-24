import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { UserAccountService } from './user-account.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountDetailsService {
  constructor(private http: HttpClient,
    private accountService: UserAccountService) {}

  getAccountDetailsForLoggedInUser(): Observable<any> {
    let url = `${environment.apiUrl}/api/v1/accounts/user/${this.accountService.userValue?.userId}`;
    return this.http.get(url);
  }
}
