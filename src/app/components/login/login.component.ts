import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  user = {
    username: '',
    password: ''
  }
  
  

  constructor(private accountService: AccountService, private router: Router){}

  ngOnInit(): void {  
  }

  async onSubmit(){
    try{
      const result = await this.accountService.login(this.user);
      this.router.navigate(['']);
    }catch(err){
      console.log(err);
    }
  }
  
}
