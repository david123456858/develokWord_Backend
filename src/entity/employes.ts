
import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany } from 'typeorm'
import { estados } from './status'
import { roles } from './rols'
@Entity()
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

  @OneToMany(type => estados, (estados) => estados.usuario)
    estado: estados

  @OneToMany(type => roles, (rol) => rol.usuarios)
    rol: roles
}
