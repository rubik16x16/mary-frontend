import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string = null;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  isLogging: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {

    let loginForm = this.loginForm;

    if(loginForm.valid && this.isLogging != true){

      this.isLogging = true;
      this.authService.login(loginForm.value).subscribe((res) => {

        if (res.status == 200) {

          let token = {
            access: res.body.access,
            refresh: res.body.refresh,
          };

          localStorage.setItem('token', JSON.stringify(token));
          localStorage.setItem('user', JSON.stringify(res.body.user));
          this.router.navigate(['/dashboard']);
        } else {

          this.error = res.error.detail;
        }

        this.isLogging = false;
      });
    }
  }
}
