import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Entry } from "./Entry";

@Entity()
export class User {

    constructor(name: string, email: string) {
        this.name = name
        this.email = email
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @OneToMany(() => Entry, entry => entry.user)
    entry: Entry[]

}
