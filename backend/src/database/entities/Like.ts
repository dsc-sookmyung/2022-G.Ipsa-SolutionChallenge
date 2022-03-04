import {Column, Entity, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class Like{
    @PrimaryColumn({type: 'int'})
    userId!: number;

    @PrimaryColumn({type: 'int'})
    likedStoryId!: number;

}