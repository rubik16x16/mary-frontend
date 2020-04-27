import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LoadBarInterceptorService } from './services/load-bar-interceptor.service';
import { LoadBarService } from './services/load-bar.service';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true
		},
		// {
		// 	provide: HTTP_INTERCEPTORS,
		// 	useClass: LoadBarInterceptorService,
		// 	multi: true
		// }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
