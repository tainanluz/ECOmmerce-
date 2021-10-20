import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  usuario: Usuario = new Usuario
  senhaConfirma: string
  isLogged=false;
  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    this.isLogged=this.authService.isLogged();
  }
  confirmarSenha(event: any) {
    this.senhaConfirma = event.target.value
  }

  cadastrar() {
    if (this.usuario.senha != this.senhaConfirma){
      alert('As senhas estão incorretas')
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) =>{
        this.usuario = resp
        this.router.navigate(['/login'])
        alert('Usuário cadastrado com sucesso!')
      }) 
    }

  }
  login() {
    this.authService.login(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp

      environment.token = this.usuarioLogin.token
      localStorage.setItem('token',this.usuarioLogin.token);
      environment.nome = this.usuarioLogin.nome
      environment.idUsuario = this.usuarioLogin.idUsuario


      this.router.navigate(['/home'])
    }, erro=> {
      if(erro.status == 400) {
        alert('Usuário ou senha estão incorretos!')
      }
    })
  }

logout():void{
this.authService.logout()
}

}

