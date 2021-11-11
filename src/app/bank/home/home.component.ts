import {Component, Injectable, OnInit} from '@angular/core';
import {BankAccountService} from '../../service/bank-account.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentBalance: number;
  amountToDeposit: number;
  amountToWithdraw: number;

  constructor(private bankAccountService: BankAccountService) {
  }

  ngOnInit(): void {
    this.bankAccountService.getCurrentBalance().subscribe((res) => {
      this.currentBalance =res
    });
  }

  deposit(){
    this.bankAccountService.deposit(this.amountToDeposit);
    this.amountToDeposit = null;
  }

  withdraw(){
    this.bankAccountService.withdraw(this.amountToWithdraw);
    this.amountToWithdraw =null;
  }

}
