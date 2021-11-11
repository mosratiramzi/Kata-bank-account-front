import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {BankAccountService} from "../../service/bank-account.service";
import {of} from "rxjs";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const currentBalance = 100;
  let fakeBankAccountService: BankAccountService;

  beforeEach(async () => {

    fakeBankAccountService = jasmine.createSpyObj<BankAccountService>('BankAccountService', {
      getCurrentBalance: of(currentBalance),
      deposit: undefined,
      withdraw: undefined,
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{provide: BankAccountService, useValue: fakeBankAccountService}],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call bank account service to retrieve a current balance', () => {
    component.ngOnInit();
    expect(fakeBankAccountService.getCurrentBalance).toHaveBeenCalled();
    expect(component.currentBalance).toBe(currentBalance);
  });

  it('should call bank account service for deposit', () => {
    component.deposit();
    expect(fakeBankAccountService.deposit).toHaveBeenCalled();
  });

  it('should call bank account service when click on deposit button', () => {
    let buttonElement = fixture.debugElement.nativeElement.querySelector('#depositBtn');
    buttonElement.click();
    expect(fakeBankAccountService.deposit).toHaveBeenCalled();
  });

  it('should call bank account service for withdraw', () => {
    component.withdraw();
    expect(fakeBankAccountService.withdraw).toHaveBeenCalled();
  });

  it('should call bank account service when click on withdraw button', () => {
    let buttonElement = fixture.debugElement.nativeElement.querySelector('#withdrawBtn');
    buttonElement.click();
    expect(fakeBankAccountService.withdraw).toHaveBeenCalled();
  });


});
