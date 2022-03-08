import {Column, Entity, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class Follow extends BaseEntity{
    @PrimaryColumn({type: 'int'})
    followerId!: number;

    @PrimaryColumn({type: 'int'})
    creatorId!: number;

}