import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
    ObjectID
} from "typeorm";

@Entity()
class Item {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string | undefined;

    @Column()
    type: number | undefined;

    @Column({ default: "true" })
    enable: boolean | undefined;

    @CreateDateColumn()
    createdAt: Date | undefined;

    @UpdateDateColumn()
    updatedAt: Date | undefined;
}

export default Item;
