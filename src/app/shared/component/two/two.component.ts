import { Component, OnInit } from '@angular/core';
import { UserNameService } from '../../service/user-name.service';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss']
})
export class TwoComponent implements OnInit{

  userName ! : string

  constructor(
    private _userNameService : UserNameService
  ){}

  ngOnInit(): void {
    this._userNameService.userName$
      .subscribe(res =>{
        this.userName = res
      })
  }
}
