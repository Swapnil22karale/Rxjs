import { Component, OnInit } from '@angular/core';
import { UserNameService } from '../../service/user-name.service';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements OnInit {

  userName ! : string
  constructor(
    private _userNameService : UserNameService
  ){}

  ngOnInit(): void {
    this._userNameService.userName$
      .subscribe( res =>{
        this.userName = res
      })
  }
}
