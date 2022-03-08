import {Column, Entity, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class LikeEntity extends BaseEntity{
    @PrimaryColumn({type: 'int'})
    userId!: number;

    @PrimaryColumn({type: 'int'})
    likedStoryId!: number;

}