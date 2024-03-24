import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  depositIntoAccount(accountId: string, amount: number, remarks: string ='') {
    let reqObj = {
      accountId,
      amount,
      remarks
    };

    return this.http.post<any>(
      `${environment.apiUrl}/api/v1/transactions/deposit`,
      reqObj
    );
  }

  withdrawFromAccount(accountId: string, amount: number, remarks: string ='') {
    let reqObj = {
      accountId,
      amount,
      remarks
    };

    return this.http.post<any>(
      `${environment.apiUrl}/api/v1/transactions/withdraw`,
      reqObj
    );
  }

  getTransactionsByAccId(accountId: string) {
    let url = `${environment.apiUrl}/api/v1/transactions/account/${accountId}`;
    return this.http.get(url);
  }
}
