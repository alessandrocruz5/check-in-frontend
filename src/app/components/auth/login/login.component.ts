import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  validateEmail(email: any) {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const user = this.loginForm.getRawValue();

    if (user.email?.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    console.log(this.loginForm.value);
    let user = this.loginForm.getRawValue();
    console.log(user);

    if (user.email == '' || user.password == '') {
      Swal.fire('Error', 'Please enter all fields', 'error');
      this.loginForm.reset();
    } else if (!this.validateEmail(user.email)) {
      Swal.fire('Error', 'Please enter a valid email.', 'error');
      this.loginForm.reset();
    } else {
      this.http
        .post('http://localhost:1217/api/login', user, {
          withCredentials: true,
        })
        .subscribe(
          () => {
            this.router.navigate(['/check-in']);
            this.loginForm.reset();
          },
          (err) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
    }
  }
}
