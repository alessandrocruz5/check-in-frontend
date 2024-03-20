import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  constructor(private http: HttpClient) {}

  checkInForm = new FormGroup({
    hours: new FormControl('', Validators.required),
    tag: new FormControl('', Validators.required),
    activity: new FormControl('', Validators.required),
  });

  // constructor(private http: HttpClient) {}

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
