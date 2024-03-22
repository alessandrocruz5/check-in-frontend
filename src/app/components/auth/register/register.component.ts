import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  // registerForm = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   email: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required),
  // });

  validateEmail(email: any) {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const user = this.registerForm.getRawValue();

    if (user.email?.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(): void {
    let user = this.registerForm.getRawValue();
    console.log(user);

    if (user.name == '' || user.email == '' || user.password == '') {
      Swal.fire({
        title: 'Please enter all fields.',
        icon: 'error',
      });
      this.registerForm.reset();
    } else if (!this.validateEmail(user.email)) {
      Swal.fire({
        title: 'Please enter a valid email.',
        icon: 'error',
      });
      this.registerForm.reset();
    } else {
      this.http
        .post('http://localhost:1217/api/register', user, {
          withCredentials: true,
        })
        .subscribe(
          () => {
            this.router.navigate(['/check-in']);
            this.registerForm.reset();
          },
          (err) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
    }
  }
}
