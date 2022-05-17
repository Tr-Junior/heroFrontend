import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { Security } from 'src/app/utils/Security.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public busy = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

  ngOnInit(): void {

    const token = Security.getToken();
    if (token) {
      this.busy = true;
      this
        .service
        .refreshToken()
        .subscribe(
          (data: any) => {
            this.busy = false;
            this.setOng(data.ong, data.token);
          },
          (err) => {
            localStorage.clear();
            this.toastr.error(err.error.message);
            this.busy = false;
          }
        );
    }
  }
  submit() {
    this.busy = true;
    this
      .service
      .authenticate(this.form.value)
      .subscribe(
        (data: any) => {
          this.busy = false;
          this.toastr.success(data.message, 'Bem Vindo, ' + data.ong.name);
          this.setOng(data.ong, data.token);
        },
        (err) => {
          this.toastr.error(err.error.message);
          console.log(err);
          this.busy = false;
        }
      );
  }

  setOng(ong: any, token: any) {
    Security.set(ong, token);
    this.router.navigate(['/selectIncidents']);
  }
}