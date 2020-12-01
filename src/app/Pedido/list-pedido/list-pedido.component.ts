import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Itens } from 'src/app/model/Itens';
import { Pedido } from 'src/app/model/Pedido';
import { PedidoService } from 'src/app/service/pedido.service';

@Component({
  selector: 'app-list-pedido',
  templateUrl: './list-pedido.component.html',
  styleUrls: ['./list-pedido.component.css']
})
export class ListPedidoComponent implements OnInit {

 pedido: Array<Pedido[]>;
  total: number;
  data = "";
  isShow=false;

  nome : String;

  constructor(private pedidoService: PedidoService, private router: Router) { }

  ngOnInit(): void {
    this.pedidoService.getPedido().subscribe(data => {
      this.pedido = data;
      this.total = data.totalElements;
    });
  }

  public consultarPedidos() {
   // if (this.nome === '') {
      this.pedidoService.getPedido().subscribe(data => {
        this.pedido = data.content;
        this.total = data.totalElements;
      });
    //}
  }
 
  public deletarUsuario(id: Number, index) {
    if (confirm('Deseja mesmo excluir esse pedido')) {
      this.pedidoService.deletPedido(id).subscribe(data => {

        this.pedido.splice(index, 1);
        alert("Pedido excluido com sucesso !")
      });
    }
  }
}
