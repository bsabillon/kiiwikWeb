import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService } from '../../../services/auth.service';
import {User} from '../../../models/user.class';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: 'required', message: 'El correo es requerido.' },
      { type: 'pattern', message: 'Introduzca un correo valido.' }
    ],
    password: [
      { type: 'required', message: 'Contraseña es requerida.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 dígitos.'}
    ]
  };

  passwordTypeInput = 'password';
  // Variable para cambiar dinamicamente el tipo de Input que por defecto sera 'password'
  iconpassword = 'eye-off';
  // Variable para cambiar dinamicamente el nombre del Icono que por defecto sera un ojo cerrado

  constructor(
    public authService: AuthService, 
    private router: Router,
    public formBuilder: FormBuilder,
  ) { 
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])),
    });
  }

  ngOnInit() {
  }

  async onLogin(){
    const user = {};
    // this.user.email = this.loginForm.get('email').value;
    // this.user.password = this.loginForm.get('password').value;
    // this.login();
      // const personFound = this.person.find(element => element.email === this.validationsForm.get('email').value);
      this.authService.loginUser(this.loginForm.value)
      .then((res) => {
        user['email'] = res.user.email;
        user['uid'] = res.user.uid;
        this.getUser(user);
      }, (error) => {
        // this.errorMessage = error.message;
        console.log(error);

      });
    }

    getUser(user) {
      this.authService.getUser(this.loginForm.get('email').value).subscribe(data => {
        let person = {};
        person = data.map(e => {
          return {
            displayName: e.payload.doc.data()['displayName'],
            visible: e.payload.doc.data()['visible'],
            pathURL: e.payload.doc.data()['pathURL'],
            photoURL: e.payload.doc.data()['photoURL'],
            activeStoreUid: e.payload.doc.data()['activeStoreUid'],
          };
        });
        user['displayName'] = person[0].displayName;
        user['visible'] = person[0].visible;
        user['pathURL'] = person[0].pathURL;
        user['photoURL'] = person[0].photoURL;
        user['activeStoreUid'] = person[0].activeStoreUid;
        console.log(user);
        localStorage.setItem('user',JSON.stringify(user));
        console.log(JSON.parse(localStorage.getItem('user')));
        this.router.navigateByUrl('/sale');
      }, (error) => {
        console.log(error);
      });
  }

  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    this.iconpassword = this.iconpassword === 'eye-off' ? 'eye' : 'eye-off';
  }

}
