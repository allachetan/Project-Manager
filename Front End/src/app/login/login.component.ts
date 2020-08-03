import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  // css properties
  paddingForErrorMsg = '0px';

  errorMsg = '';

  buttonText = 'Demo';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  showError(error: string) {
    this.paddingForErrorMsg = '20px';
    this.errorMsg = error;
  }

  onInputChnage() {
    if (this.loginForm.controls.username.value === '' && this.loginForm.controls.password.value === '') {
      this.buttonText = 'Demo';
    } else {
      this.buttonText = 'Sign in';
    }
  }

  onClick() {
    if (this.loginForm.invalid) {
      if (this.loginForm.controls.username.value === '' && this.loginForm.controls.password.value === '') {
        this.authService.demo().subscribe(
          data => {
            // tslint:disable-next-line: no-string-literal
            this.authService.setCurrentTokenValue(data['jwt']);
            // tslint:disable-next-line: no-string-literal
            this.authService.setMainBlockId(data['blockId']);
            this.router.navigate(['/']);
          });
      } else {
        this.showError('Username and Password are Required!');
      }
    } else {
      this.authService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe(
        data => {
          // tslint:disable-next-line: no-string-literal
          this.authService.setCurrentTokenValue(data['jwt']);
          // tslint:disable-next-line: no-string-literal
          this.authService.setMainBlockId(data['blockId']);
          this.router.navigate(['/']);
        },
        error => {
          this.showError('Username or Password Incorrect!');
        }
      );
    }
  }

}
