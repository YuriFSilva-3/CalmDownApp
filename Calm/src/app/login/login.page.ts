import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup
  
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authServices: AuthService,
    private router: Router
  ) { }

  get email(){
    return this.credentials.get('email'); 
  }
  get password(){
    return this.credentials.get('password');
  }



  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],

    });
  }
  
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authServices.login(this.credentials.value);
    await loading.dismiss();

    if (user){
      this.router.navigateByUrl('/home', {replaceUrl: true});
    

    }
    else{
      this.showAlert('login failed')
    }

  }
  async register(){
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authServices.register(this.credentials.value);
    await loading.dismiss();

    if (user){
      this.router.navigateByUrl('/home', {replaceUrl: true});
    

    }
    else{
      this.showAlert('Registration failed')
    }
  }

  async showAlert(message){
    const alert = await this.alertController.create({
      message,
      buttons : ['ok'],
    });
    await alert.present();

  }
 

}
