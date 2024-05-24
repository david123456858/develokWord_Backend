import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { employes } from './employes'
@Entity('roles')
export class roles {
  @PrimaryColumn()
    id_rol: string

  @Column()
    nombre_rol: string

  // Es la relacion que existe le paso la entindad y la columna con la que se va a comunicar
  @OneToMany(type => employes, (usuarios) => usuarios.rol)
    usuarios: employes[]
}
