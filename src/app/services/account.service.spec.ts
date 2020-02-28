import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from './account.service';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/Account';

describe('AccountService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let accountService: AccountService;
  const ACCOUNTS: any[] = [
    {
      id: 1,
      amount: 200,
      user: 'test@g.com'
    },
    {
      id: 2,
      amount: 300,
      user: 'test@g.com'
    }
  ];

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AccountService
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    accountService = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(accountService).toBeTruthy();
  });

  it('should get a record', () => {

    accountService.get(1).subscribe(res => {

      expect(res).toEqual(new Account(ACCOUNTS[0]));
    });

    let req = httpTestingController.expectOne(`${AccountService.API_URL}/${ACCOUNTS[0].id}`);

    expect(req.request.method).toEqual('GET');
    req.flush(ACCOUNTS[0]);
    httpTestingController.verify();
  });

  it('should get all records', () => {

    accountService.all().subscribe(res => {

      res.forEach((account, i) => {

        expect(account).toEqual(new Account(ACCOUNTS[i]));
      });
    });

    let req = httpTestingController.expectOne(AccountService.API_URL);
    expect(req.request.method).toEqual('GET');
    req.flush(ACCOUNTS);
    httpTestingController.verify();
  });

  it('should create a record', () => {

    accountService.create(new Account(ACCOUNTS[0])).subscribe(res => {

      expect(res).toEqual(new Account(ACCOUNTS[0]));
    });

    let req = httpTestingController.expectOne(AccountService.API_URL);
    expect(req.request.method).toEqual('POST');
    req.flush(ACCOUNTS[0]);
    httpTestingController.verify();
  });

  it('should delete a record', () => {

    accountService.delete(1).subscribe();
    let req = httpTestingController.expectOne(`${AccountService.API_URL}/${ACCOUNTS[0].id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush('');
    httpTestingController.verify();
  });
});
