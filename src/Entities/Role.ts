import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
    ObjectID
} from "typeorm";

@Entity()
class Role {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string | undefined;

    @Column({unique: true})
    slug: string | undefined;

    @Column({ default: "true" })
    enable: boolean | undefined;

    @CreateDateColumn()
    createdAt: Date | undefined;

    @UpdateDateColumn()
    updatedAt: Date | undefined;
}

export default Role;
