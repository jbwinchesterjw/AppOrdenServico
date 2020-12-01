import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  user: Array<Usuario[]>;
  nome: String;
  p: String;
  total: number;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.getUsuario().subscribe(data => {
      this.user = data.content;
      this.total = data.totalElements;
    });
  }

  public deletarUsuario(id: Number, index) {
    if (confirm('Deseja mesmo excluir esse usuario')) {
      this.usuarioService.deletUsuario(id).subscribe(data => {
        this.user.splice(index, 1);
        alert("Usuario excluido com sucesso !")
      });
    }
  }

  public consultarUser() {
    if (this.nome === '') {
      this.usuarioService.getUsuario().subscribe(data => {
        this.user = data.content;
        this.total = data.totalElements;
      });

    } else {
      this.usuarioService.constarUserPorNome(this.nome).subscribe(data => {
        this.user = data.content;
        this.total = data.totalElements;
      });
    }
    
  }

  public carregarPaginar(pagina) {
    this.usuarioService.getUsuarioListPage(pagina -1).subscribe(data => {
      this.user = data.content;
      this.total = data.totalElements;
    });
  }
}
