import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsComponent } from './accounts.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../../../../services/account.service';

describe('AccountsComponent', () => {

  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
    const req = httpTestingController.expectOne(AccountService.API_URL);
    req.flush([]);
    httpTestingController.verify();
  });
});
