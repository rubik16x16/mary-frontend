import { LoginComponent } from './login.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

describe('Login Component', () => {

	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;

	beforeEach(async(() => {

		TestBed.configureTestingModule({
			imports: [
				ReactiveFormsModule,
				FormsModule,
				MaterialModule,
				FlexLayoutModule,
				BrowserAnimationsModule,
				AppRoutingModule,
				HttpClientTestingModule
			],
			declarations: [LoginComponent]
		}).compileComponents();

		httpClient = TestBed.inject(HttpClient);
		httpTestingController = TestBed.inject(HttpTestingController);
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeDefined();
	});

	it('should be validated', () => {

		component.loginForm.setValue({
			email: 'test',
			password: 'test'
		});

		component.login();
		expect(component.loginForm.valid).toBe(false);
		expect(component.isLogging).toBe(false);

		component.loginForm.setValue({
			email: 'test@test.com',
			password: 'test'
		});

		component.login();
		expect(component.loginForm.valid).toBe(true);
		expect(component.isLogging).toBe(true);

		const req = httpTestingController.expectOne(AuthService.LOGIN_API_URL);
		let errorDetail: string = 'No active account found with the given credentials';

		req.flush({
			detail: errorDetail
		}, {
			status: 403,
			statusText: 'Unauthorized'
		});

		expect(component.isLogging).toBe(false);
		expect(component.error).toBe('No active account found with the given credentials');
		fixture.detectChanges();

		let loginElement: HTMLElement = fixture.nativeElement;
		let errorElement = loginElement.querySelector('span.error.ng-star-inserted');
		expect(errorElement.textContent).toContain(errorDetail);

		httpTestingController.verify();
	});
});
