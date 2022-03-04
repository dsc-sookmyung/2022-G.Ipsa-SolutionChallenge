import {Column, Entity, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class Comment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'int'})
    userId!: number;

    @Column({type: 'text'})
    content!: string;

    @Column({
        type: 'date',
        default: ()=> 'NOW()'
    })
    createdAt!: string;

}