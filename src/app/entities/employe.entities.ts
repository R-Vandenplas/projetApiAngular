import { Service } from './service.entities';

export interface Employe{
    idemploye: number;
    mail: string;
    nom: string;
    prenom: string;
    service: Service;
}
