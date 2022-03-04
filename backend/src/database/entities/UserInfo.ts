import {Column, Entity, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class UserInfo extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'text', unique: true})
    email!: string;

    @Column({type: 'text'})
    birth!: string;

    @Column({type: 'boolean'})
    showBirth!: boolean;

    @Column({type: 'boolean'})
    isCreator!: boolean;

    @Column({type: 'text'})
    nickname!: string;

    @Column({type: 'text'})
    profileImageSrc!: string;
}