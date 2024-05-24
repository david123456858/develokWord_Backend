
import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne } from 'typeorm'
import { estados } from './status'
import { roles } from './rols'
@Entity('empleados')
export class employes extends BaseEntity {
  @PrimaryColumn()
    id_usuario: String

  @Column()
    nombre1: string

  @Column()
    nombre2: string

  @Column()
    apellido1: string

  @Column()
    apellido2: string

  @Column()
    correo: string

  @Column()
    contraseña: string

  @ManyToOne(type => estados, (estados) => estados.usuario)
    estado: estados

  @ManyToOne(type => roles, (rol) => rol.usuarios)
    rol: roles
}
