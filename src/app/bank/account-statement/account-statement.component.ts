import { Component, OnInit } from '@angular/core';
import {TransactionDetails} from '../../model/TransactionDetails';
import {BankAccountService} from '../../service/bank-account.service';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.scss']
})
export class AccountStatementComponent implements OnInit {

  transactionsList: TransactionDetails[];
  constructor(private bankAccountService: BankAccountService) { }

  ngOnInit(): void {
    this.bankAccountService.getTransactionsDetails().subscribe((res)=>{
      this.transactionsList = res;
    });
  }



}
