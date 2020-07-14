import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerAdminForm: FormGroup;
  validation_messages = {
    name: [
      { type: 'required', message: 'El nombre es requerido.' },
    ],
    company: [
      { type: 'required', message: 'La empresa es requerida.' },
    ],
    email: [
      { type: 'required', message: 'El correo es requerido.' },
      { type: 'pattern', message: 'Introduzca un correo valido.' }
    ],
    password: [
      { type: 'required', message: 'Contraseña es requerida.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 dígitos.' }
    ],
  };

  passwordTypeInput = 'password';
  // Variable para cambiar dinamicamente el tipo de Input que por defecto sera 'password'
  iconpassword = 'eye-off';
  // Variable para cambiar dinamicamente el nombre del Icono que por defecto sera un ojo cerrado

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    private authService: AuthService,

  ) {
    this.registerAdminForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
      ])),
      company: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });


   }

  ngOnInit() {
  }

  async onRegister() {

    console.log(this.registerAdminForm.value); //to print test
    const value = {};
    const record: any = {};
    value['email'] = this.registerAdminForm.get('email').value;
    value['password'] = this.registerAdminForm.get('password').value;
    this.authService.registerUser(value).then(res => {
      console.log(res);
      record['email'] = res.user.email;
      record['uid'] = res.user.uid;
      record['displayName'] = this.registerAdminForm.get('name').value;
      record['company'] = this.registerAdminForm.get('company').value;
      const store = {};
      store['storeName'] = record.company,
      store['collaborators'] = [record.uid]
      this.authService.createStore(store).then((resp) => {
        console.log(resp);
        const user = {};
        user['email'] = record.email;
        user['uid'] = record.uid;
        user['displayName'] = record.displayName;
        user['activeStoreUid'] = resp.id;
        this.createUser(user);
      }, (error) => {
      
        console.log(error);

      });;

    }, (error) => {

      console.log(error);

    });
  }

  createUser(user) {
    this.authService.createUser(user).then(resps =>  {
      user['storeName'] = this.registerAdminForm.get('company').value;
      localStorage.setItem('user',JSON.stringify(user));
      console.log(resps);
      this.router.navigate(['/sale']);
    }).catch(error => {
      console.log(error);
    });
  }

  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    this.iconpassword = this.iconpassword === 'eye-off' ? 'eye' : 'eye-off';
  }



}
