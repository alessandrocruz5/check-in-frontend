import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(private http: HttpClient) {}

  authenticated = false;
  message: any;

  ngOnInit(): void {
    this.http
      .get('http://localhost:1217/api/user', {
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.message = `Welcome, ${res.name}!`;
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          this.message = 'You are not logged in.';
          Emitters.authEmitter.emit(false);
        }
      );

    Emitters.authEmitter.subscribe((isAuthenticated: boolean) => {
      this.authenticated = isAuthenticated;
    });
  }

  checkInForm = new FormGroup({
    hours: new FormControl('', Validators.required),
    tag: new FormControl('', Validators.required),
    activity: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.log(this.checkInForm.value);

    const formData = this.checkInForm.value;
    this.http.post('http://localhost:1217/api/newForm', formData).subscribe(
      (res) => {
        console.log('Activity checked in!', res);
      },
      (err) => {
        console.error(err);
      }
    );

    this.checkInForm.reset();
  }
}
