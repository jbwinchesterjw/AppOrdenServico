import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Telefone } from 'src/app/model/Telefone';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: 'app-root',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  usuario = new Usuario();
  telefones = new Telefone();
  data = "";
  constructor(private routerActive: ActivatedRoute, private service: UsuarioService) { }

  ngOnInit(): void {
    let id = this.routerActive.snapshot.paramMap.get('id');
    if (id != null) {
      this.service.getUserId(id).subscribe(data => {
        this.usuario = data;
      });
    }
  }

  salvarUser() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      this.service.postUser(this.usuario).subscribe(data => {
        this.novo();
        //console.info("atualizado" + data);
        alert("Atualizado com sucesso !");
      })
    } else {
      this.service.postUser(this.usuario).subscribe(data => {
        this.novo();
        alert("Cadastro Feito com sucesso !");
      })
    }
  }
  public novo() {
    this.usuario = new Usuario();
    this.telefones = new Telefone();
  }

  
  public addFone(){
   if (this.usuario.telefones === undefined) {
     this.usuario.telefones = new Array<Telefone>()
   }
   this.usuario.telefones.push(this.telefones);
   this.telefones = new Telefone();
  }

  
  
  public excluirTelefone(id, i){

    if (id  == null) {
      this.usuario.telefones.splice(i, 1);
      return;
    }
    if (id !== null && confirm("Deseja Excluir  Este Telefone ?")) {
      this.service.deleteTelefone(id).subscribe(data =>{
        this.usuario.telefones.splice(i, 1);
        alert("Telefone Excluido com Sucesso !")
      })
    }
  }

}
