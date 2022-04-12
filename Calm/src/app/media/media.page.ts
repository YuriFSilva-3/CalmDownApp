import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
})
export class MediaPage implements OnInit {

  constructor(private router: Router) { }
   videos(){
     this.router.navigateByUrl('/videos')
   }

  ngOnInit() {
  }

}
