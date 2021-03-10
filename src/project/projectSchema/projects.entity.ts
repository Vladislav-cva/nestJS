import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Features } from "./feature.entity";

@Entity()
export class Projects{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @OneToMany(() => Features, f => f.projects,{ cascade: ['insert','update'], onUpdate: 'RESTRICT'})
    @JoinColumn()
    public features: Features[];
}
