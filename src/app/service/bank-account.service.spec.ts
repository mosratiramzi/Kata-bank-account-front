import { TestBed } from '@angular/core/testing';

import { BankAccountService } from './bank-account.service';
import {TransactionDetails} from "../model/TransactionDetails";

describe('BankAccountService', () => {
  let service: BankAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should deposit and add amount to balance', () => {
    service.deposit(10);
    expectBalance(10);
  });

  it('should save the transaction of deposit', () => {
    service.deposit(10);
    expect(service.transactionsList.length).toBe(1);
  });

  it('should withdraw and subtract the amount from the balance', () => {
    service.deposit(25);
    service.withdraw(5);
    expectBalance(20);
  });

  it('should return the current balance', () => {
    service.deposit(25);
    service.getCurrentBalance();
    expectBalance(25);
  });

  it('should return the history of transactions', () => {
    service.deposit(25);
    service.withdraw(5);
    let transactionsList: any[];

    service.getTransactionsDetails().subscribe( (res) => {
      transactionsList = res;
    });
    expect(transactionsList.length).toBe(2);
    expect(transactionsList[1].transactionType).toBe("Withdraw")
  });


  function expectBalance(balance: number): void {
    let actualBalance: number;
    service
      .getCurrentBalance()
      .subscribe((res) => {
        actualBalance = res;
      });
    expect(actualBalance).toBe(balance);
  }
});
