import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons'
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any;
  loginForm: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private TokenService: TokenService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      'password': [
        '',
        [
          Validators.required,
          Validators.minLength(5),
        ]
      ]
    });

    this.onChanges();
    this.listenToken();
  }

  onChanges() {
    this.loginForm.statusChanges.subscribe(
      result => (result == 'VALID') ?
        this.spinnerButtonOptions.disabled = false : this.spinnerButtonOptions.disabled = true
    );
  }

  listenToken(): void {
    let token = this.TokenService.GetToken().trim().length;
    if (token > 0) { this.router.navigate(['']) }
  }

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    disabled: true,
    text: 'Ingresar',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    customClass: 'btnlogin',
    fullWidth: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon: 'verified_user'
    }
  }

  onLoginSubmit(): void {
    if (!this.loginForm.valid) { return; }
    this.spinnerButtonOptions.active = true;
    this.user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.AuthService.Login(this.user).subscribe(response => {
      if (response.type == "success") {
        this.TokenService.SetToken(response.token);
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: response.message,
          confirmButtonColor: "#0069d9",
          confirmButtonText: "Aceptar"
        })
          .then(() => {
            this.AuthService.LoginIsValid();
          })
      }
    }, err => {
      this._snackBar.open(err, 'cerrar', {
        duration: 5000,
        verticalPosition: "top",

      });
      this.spinnerButtonOptions.active = false;
    })

  }
}
