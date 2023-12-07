import { Employe } from './employe.entities';

export interface Message{
    id_message: number;
    objet: string;
    contenu: string;
    dateenvoi: Date;
    emetteur: Employe;
}
