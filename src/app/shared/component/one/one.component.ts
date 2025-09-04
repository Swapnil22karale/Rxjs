import { Component, OnInit } from '@angular/core';
import { UserNameService } from '../../service/user-name.service';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent implements OnInit{

  userName ! :string

  constructor(
    private userNameService : UserNameService
  ){}

  ngOnInit(): void {
    this.userNameService.userName$
      .subscribe( res =>{
        this.userName = res
      })
  }

}
