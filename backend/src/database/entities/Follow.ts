import {Column, Entity, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class Follow extends BaseEntity{
    @PrimaryColumn({type: 'int'})
    follwerId!: number;

    @PrimaryColumn({type: 'int'})
    followedUserId!: number;

}