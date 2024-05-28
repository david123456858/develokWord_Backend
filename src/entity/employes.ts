
import { Entity, Column, PrimaryColumn, ManyToOne, BaseEntity, OneToMany } from 'typeorm'
import { estados } from './status'
import { roles } from './rols'
import { equipos } from './teams'
import { ordenes } from './orders'
@Entity('empleados')
export class employes extends BaseEntity {
  @PrimaryColumn()
    id_usuario: String

  @Column()
    nombre1: string

  @Column({ nullable: true })
    nombre2: string

  @Column()
    apellido1: string

  @Column({ nullable: true })
    apellido2: string

  @Column()
    correo: string

  @Column()
    contrasena: string

  @ManyToOne(type => estados, (estados) => estados.usuario)
    idEstado: estados

  @ManyToOne(type => roles, (rol) => rol.usuarios)
    idRol: roles

  @ManyToOne(type => equipos, (equipo) => equipo.empleado, { nullable: true })
    idEquipo: equipos

  @OneToMany(type => ordenes, (orden) => orden.usuario)
    ordenes: ordenes[]
}
