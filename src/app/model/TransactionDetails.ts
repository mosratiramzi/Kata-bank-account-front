import {TransactionType} from "./TransactionType";

export class TransactionDetails {

  transactionAt: Date;
  transactionType: string;
  amount: number;
  balance: number;


  constructor(transactionAt: Date, transactionType: string, amount: number, balance: number) {
    this.transactionAt = transactionAt;
    this.transactionType = transactionType;
    this.amount = amount;
    this.balance = balance;
  }
}
