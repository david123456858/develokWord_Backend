import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { employes } from "./employes"

@Entity()
export class estados {
    @PrimaryColumn()
    id_estado: string
    @Column()
    nombre_estado: string
    @OneToMany(() => employes, (usuario) => usuario.id_estado)
    usuario: employes[]

    
}