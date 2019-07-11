import { Appointment } from './../../appointment.type';
export class Usuario{
id: number;
nombreUsuario: string;
constrasenia: string;
nombre?: string;
apellido1?: string;
apellido2?: string;
appointment?:Set <Appointment>
}