import { Telefone } from './Telefone';

export class Usuario {
    id : number;
    login : string;
    senha  : string;
    nome : string;

    telefones : Array<Telefone>;
}