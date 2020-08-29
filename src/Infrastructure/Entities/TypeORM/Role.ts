import { Entity, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import IRoleDomain from "../../../InterfaceAdapters/IDomain/IRoleDomain";

@Entity()
class Role implements IRoleDomain
{
    @Column()
    _id: string;

    @Column()
    name: string | undefined;

    @Column({unique: true})
    slug: string | undefined;

    @Column({ default: "true" })
    enable: boolean | undefined;

    @Column()
    permissions: string[];

    @CreateDateColumn()
    createdAt: Date | undefined;

    @UpdateDateColumn()
    updatedAt: Date | undefined;

    getId(): string
    {
        throw new Error("Method not implemented.");
    }
}

export default Role;
