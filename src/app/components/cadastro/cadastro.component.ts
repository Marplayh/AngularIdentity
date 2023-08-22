import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

interface ApiResponse {
  message: string;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  account = {
    username: '',
    password: '',
    repassword: '',
    birthdate: '',
  }

  error = 'Erro ao cadastrar';
  

  cadastradoComSucesso: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {}

 ngOnInit(): void {
     
 }

 async onSubmit() {
  try{
    const result = await this.accountService.cadastrar(this.account);
    console.log(result);
    this.router.navigate(['/login']);
  }catch(err){
    console.error(err);
  }
 }
}
