import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from './account.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('AccountService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let accountService: AccountService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AccountService
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    accountService = TestBed.get(AccountService);
  });

  it('should be created', () => {
    expect(accountService).toBeTruthy();
  });

  it('should get a record', () => {

    let account: any = {
      id: 1,
      amount: 200,
      user: 'test@g.com'
    };

    console.log(accountService.test());

  });
});
