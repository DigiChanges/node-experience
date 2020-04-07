import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string | undefined;

    @Column({unique: true})
    email: string | undefined;

    @Column()
    password: string | undefined;

    @Column({ default: "true" })
    enable: boolean | undefined;

    @CreateDateColumn()
    createdAt: Date | undefined;

    @UpdateDateColumn()
    updatedAt: Date | undefined;

    getId(): string {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    isEnable(): boolean {
        return this.enable;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }
}

export default User;
