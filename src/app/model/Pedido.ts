import { Itens } from './Itens';

export class Pedido{
    id : number;
    data : String;
    descricao : String;
    status : String;

    itens : Array<Itens>;
}