import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserNameService } from './shared/service/user-name.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Rxjs';

  @ViewChild('userName') userName ! : ElementRef

  constructor(
    private _userNameService : UserNameService
  ){}

  ngOnInit(): void {
     this.onUsernameChange()
  }

  onUsernameChange(){
    let userNameValue = this.userName.nativeElement.value;
    console.log(userNameValue);

    this.userName.nativeElement.value = ''
    this._userNameService.userName$.next(userNameValue)
    
  }

}
