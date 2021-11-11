import {Injectable} from '@angular/core';
import {TransactionDetails} from "../model/TransactionDetails";
import {TransactionType} from "../model/TransactionType";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  private balanceSubject: BehaviorSubject<number>;
  private statementsSubject: BehaviorSubject<TransactionDetails[]>;
  transactionsList: TransactionDetails[] = [];
  balance: number = 0;

  constructor() {
    this.balanceSubject = new BehaviorSubject(0);
    this.statementsSubject = new BehaviorSubject([]);
  }

  public getCurrentBalance(): Observable<number> {
    return this.balanceSubject.asObservable();
  }

  getTransactionsDetails(): Observable<TransactionDetails[]> {
    return this.statementsSubject.asObservable();
  }

  deposit(amount: number) {
    this.balance += amount;
    let date = this.getDateOfTransaction();
    let transactionDetails = new TransactionDetails(date, TransactionType.DEPOSIT, amount, this.balance);
    this.transactionsList.push(transactionDetails);
    this.notify();
  }

  withdraw(amount: number) {
    this.balance -= amount;
    let date = this.getDateOfTransaction();
    let transactionDetails = new TransactionDetails(date, TransactionType.WITHDRAW, amount, this.balance);
    this.transactionsList.push(transactionDetails);
    this.notify();
  }


  private getDateOfTransaction() {
    let date: Date = new Date();
    return date;
  }

  private notify(): void {
    this.balanceSubject.next(this.balance);
    this.statementsSubject.next(Object.assign([], this.transactionsList));

  }
}
