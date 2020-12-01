import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Itens } from 'src/app/model/Itens';
import { Pedido } from 'src/app/model/Pedido';
import { PedidoService } from 'src/app/service/pedido.service';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string>{

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }

}

@Injectable()
export class FormataData extends NgbDateParserFormatter {

  readonly DELIMITER = '/';//26/11/2020

  /*parse responsavel por pegar os dados do component e transformar em um array*/
  parse(value: string): NgbDateStruct | null {

    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;

  }
  /*transforma o array em uma forma mas legivel */
  format(date: NgbDateStruct): string | null {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}
function validarDia(valor) {
  if (valor.toString !== '' && parseInt(valor) <= 9) {
    return '0' + valor;
  }
  return valor;
}


@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.component.html',
  styleUrls: ['./add-pedido.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: FormataData },
  { provide: NgbDateAdapter, useClass: FormatDateAdapter }]
})
export class AddPedidoComponent implements OnInit {

  pedido = new Pedido();
  itens = new Itens();
  data = "";
  constructor(private routerActive: ActivatedRoute, private service: PedidoService, private router: Router) { }

  ngOnInit(): void {
    let id = this.routerActive.snapshot.paramMap.get('id');
    if (id != null) {
      this.service.getPedidoId(id).subscribe(data => {
        this.pedido = data;
      });
    }
  }

  public aprovarPedido() {
    if (this.pedido.id != null && this.pedido.id.toString().trim() != null) {
      this.service.patchStatusAprovado(this.pedido).subscribe(data => {
        this.novoPedido();
        alert("Pedido Aprovado !");
      })
    }
  }

  public cancelarPedido() {
    if (this.pedido.id != null && this.pedido.id.toString().trim() != null) {
      this.service.patchStatusReprovado(this.pedido).subscribe(data => {
        this.novoPedido();
        alert("Pedido Cancelado !");
      })
    }
  }

  salvarPedido() {
    if (this.pedido.id != null && this.pedido.id.toString().trim() != null) {
      this.service.postPedido(this.pedido).subscribe(data => {
        this.novoPedido();
        alert("Atualizado com sucesso !");
      })
    } else {
      this.service.postPedido(this.pedido).subscribe(data => {
        this.novoPedido();
        alert("Cadastro Feito com sucesso !");
      })
    }
  }
  public novoPedido() {
    this.pedido = new Pedido();
    this.itens = new Itens();
  }

  public addItens() {
    if (this.pedido.itens === undefined) {
      this.pedido.itens = new Array<Itens>();
    }
    this.pedido.itens.push(this.itens);
    this.itens = new Itens();

  }



  public excluirItens(id, i) {

    if (id == null) {
      this.pedido.itens.splice(i, 1);
      return;
    }
    if (id !== null && confirm("Deseja Excluir  Este Telefone ?")) {
      this.service.deleteItens(id).subscribe(data => {
        this.pedido.itens.splice(i, 1);
        alert("Iten Excluido com Sucesso !")
      })
    }
  }
}
