import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from '../services/AuthService';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
notes = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    ) {
      this.dataService.getNotes().subscribe(res =>{
        console.log(res);
        this.notes = res;
      })
    }

    async openNote(note){
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: {id: note.id},
        breakpoints: [ 0, 0.5, 0.8],
        initialBreakpoint: 0.8
      });
      modal.present();
    }

    
async logout(){
  await this.authService.logout();
  this.router.navigateByUrl('/', {replaceUrl:true})
}

}


