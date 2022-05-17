import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Caso } from 'src/app/models/caso.model';
import { DataService } from 'src/app/services/data.service';
import { Security } from 'src/app/utils/Security.util';
import { Ong } from 'src/app/models/ong.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {



  //@Input() caso!: Caso;
  public form: FormGroup;
  public ong!: Ong;
  public caso!: Caso;
  //public lista!: Observable<Caso[]>;
  public listar: Caso[] = [];
  public busy = false;

  constructor(
    private service: DataService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])],
      value: ['', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])]
    });
  }

  listarCaso(ong: any) {
    this
      .service
      .getCaso(ong)
      .subscribe(
        (data: any) => {
          this.listar = data;
        })
  }

  sair() {
    Security.clear();
  }


  deleteCaso(id: any) {
    this
      .service
      .deleteCaso(id)
      .subscribe(
        (data: any) => {
          this.busy = false;
          this.toastr.success(data.message);
          console.log(data);
          this.listarCaso(this.ong._id);
        },
        (err: any) => {
          this.toastr.error(err.message);
          this.busy = false;
          console.log(err);

        }
      );

  }

  submit() {
    this.busy = true;
    this
      .service
      .createCaso(this.form.value)
      .subscribe(
        (data: any) => {
          this.busy = false;
          this.toastr.success(data.message);
          this.listarCaso(this.ong._id);
          console.log(data);
        },
        (err: any) => {
          this.toastr.warning(err.error[0].message);
          this.busy = false;
          console.log(err);
        }
      );
    this.resetForm();
  }

  resetForm() {
    this.form.reset();
  }

  ngOnInit(): void {
    this.ong = Security.getOng();
    this.listarCaso(this.ong._id);

  }
}
