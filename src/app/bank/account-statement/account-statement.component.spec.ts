import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountStatementComponent} from './account-statement.component';
import {BankAccountService} from "../../service/bank-account.service";
import {of} from "rxjs";
import {TransactionDetails} from "../../model/TransactionDetails";
import {TransactionType} from "../../model/TransactionType";

describe('AccountStatementComponent', () => {
  let component: AccountStatementComponent;
  let fixture: ComponentFixture<AccountStatementComponent>;

  let fakeBankAccountService: BankAccountService;

  const transactionsHistory = [
    new TransactionDetails(new Date(),TransactionType.DEPOSIT,10,10),
    new TransactionDetails(new Date(),TransactionType.WITHDRAW,5,5)
  ];
  beforeEach(async () => {
    fakeBankAccountService = jasmine.createSpyObj<BankAccountService>('BankAccountService', {
      getTransactionsDetails: of(transactionsHistory),
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountStatementComponent],
      providers: [{provide: BankAccountService, useValue: fakeBankAccountService}],

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call account service to display the statement', () => {
    component.ngOnInit();
    expect(fakeBankAccountService.getTransactionsDetails).toHaveBeenCalled();
  });

  it('should display the statement of account', () => {
    component.ngOnInit();
    expect(component.transactionsList.length).toBe(2);
    expect(component.transactionsList).toEqual(transactionsHistory);
  });

});
