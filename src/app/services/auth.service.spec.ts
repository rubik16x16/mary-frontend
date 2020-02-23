import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    authService = new AuthService(httpClient);
  });

  it('#login() should login', () => {

    const testData: any = 'Test data';

    authService.login({email: 'rubik@rubik.com', password: 'secret'}).subscribe(res => {

      expect(res.status).toBe(200);
    });

    const req = httpTestingController.expectOne(AuthService.LOGIN_API_URL);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
    httpTestingController.verify();
  });
});
