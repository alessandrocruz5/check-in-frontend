import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitters/emitters';
import Swal from 'sweetalert2';

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
          Emitters.authEmitter.emit((this.authenticated = true));
        },
        (err) => {
          this.message = 'You are not logged in.';
          Emitters.authEmitter.emit((this.authenticated = false));
        }
      );
  }

  checkInForm = new FormGroup({
    hours: new FormControl('', Validators.required),
    tag: new FormControl('', Validators.required),
    activity: new FormControl('', Validators.required),
  });

  onSubmit() {
    let checkIn = this.checkInForm.getRawValue();

    if (checkIn.hours == '' || checkIn.tag == '' || checkIn.activity == '') {
      Swal.fire({
        title: 'Please enter all fields.',
        icon: 'error',
      });
    } else {
      let tagValue = this.checkInForm.get('tag').value;
      if (!tagValue.startsWith('#')) {
        tagValue = '#' + tagValue;
        this.checkInForm.get('tag').setValue(tagValue);
      }

      console.log(this.checkInForm.value);
      const formData = this.checkInForm.value;
      this.http
        .post('http://localhost:1217/api/newCheckIn', formData, {
          withCredentials: true,
        })
        .subscribe(
          (res) => {
            console.log('Activity checked in!', res);
            Swal.fire({
              title: 'Activity tracked!',
              icon: 'success',
              footer: '<a href="/view">View check-ins?</a>',
            });
          },
          (err) => {
            console.error(err);
          }
        );

      this.checkInForm.reset();
    }
  }
}
