import { Component, OnInit } from '@angular/core';
import { OfService } from '../../service/of.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit{

  constructor(
    private _ofService : OfService
  ){}

  ngOnInit(): void {
    this._ofService.ofEvenNum$.subscribe(num =>{
      console.log(num);
      
    })
  }

}
