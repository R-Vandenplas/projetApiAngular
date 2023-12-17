import { Employe } from './employe.entities';

export interface Message{
    idmessage: number;
    objet: string;
    contenu: string;
    dateenvoi: Date;
    emetteur: Employe;
}

