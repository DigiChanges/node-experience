import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
    ObjectID
} from "typeorm";

@Entity()
class User {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column({unique: true})
    email: string | undefined;

    @Column()
    password: string | undefined;

    @Column({ default: "true" })
    enable: boolean | undefined;

    @Column()
    confirmationToken: string | undefined;

    @Column()
    passwordRequestedAt: Date | undefined;

    @CreateDateColumn()
    createdAt: Date | undefined;

    @UpdateDateColumn()
    updatedAt: Date | undefined;
}

export default User;
