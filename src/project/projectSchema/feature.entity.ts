import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Projects } from "./projects.entity";


@Entity()
export class Features {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    featureName: string;

    @Column()
    level: string;

    @Column()
    featureDescription: string;

    @Column()
    maxEstimate: number;

    @Column()
    minEstimate: number;


    @ManyToOne(() => Projects, p => p.features, {onDelete: 'CASCADE', cascade: ['insert','update']})
    public projects: Projects
}
