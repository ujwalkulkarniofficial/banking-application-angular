import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AccountDetailsService } from '../services/account-details/account-details.service';
import { Observable, catchError, take } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { TransactionService } from '../services/transactions/transaction.service';
import { TransactionRecord } from './transaction-record.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  accountDetails: any;
  colorControl = new FormControl('primary' as ThemePalette);
  isDeposit = false;
  isWithdraw = false;
  amount = 0;
  remarks = '';
  panelOpenState = false;

  displayedColumns: string[] = [
    'transactionTime',
    'transactionType',
    'remarks',
    'amount',
  ];
  tableDataSource: any;
  
  get now(): string {
    return Date();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  transactError: Error | undefined;
  constructor(
    private accountDetailsService: AccountDetailsService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.setAccountDetails();
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
  }

  setTransactionsDetails() {
    this.transactionService
      .getTransactionsByAccId(this.accountDetails.accountId)
      .pipe(take(1))
      // @ts-ignore
      .subscribe((res: any[]): void => {
        this.tableDataSource = new MatTableDataSource<TransactionRecord>(
          res.map((rec) => {
            let record = {
              transactionTime: rec.transactionTimestamp,
              transactionType: rec.transactionType,
              remarks: rec.remarks,
              amount: rec.amount,
            } as TransactionRecord;
            return record;
          })
        );
      });
  }

  setAccountDetails() {
    this.accountDetailsService
      .getAccountDetailsForLoggedInUser()
      .pipe(take(1))
      .subscribe((res: any) => {
        this.accountDetails = res;
        this.setTransactionsDetails();
      });
  }

  initState(): void {
    this.amount = 0;
    this.remarks = '';
  }

  transact(event: any) {
    if (this.isDeposit) {
      this.transactionService
        .depositIntoAccount(
          this.accountDetails.accountId,
          this.amount,
          this.remarks
        )
        .pipe(take(1))
        .subscribe((res) => {
          this.setAccountDetails();
          this.initState();
        }, catchError(err => this.transactError = err));
    }
    if (this.isWithdraw) {
      this.transactionService
        .withdrawFromAccount(
          this.accountDetails.accountId,
          this.amount,
          this.remarks
        )
        .pipe(take(1))
        .subscribe((res) => {
          this.setAccountDetails();
          this.initState();
        });
    }
  }
}
