import {Column, Entity, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class Story extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'text'})
    creatorNickname!: string;

    @Column({type: 'text'})
    title!: string;

    @Column({type: 'text'})
    thumbnailImageSrc!: string;

    @Column({type: 'text'})
    category!: string;

    @Column({type: 'text'})
    audioFileSrc!: string;

    @Column({type: 'int'})
    likes!: number;

    @Column({
        type: 'date',
        default: ()=> 'NOW()'
    })
    createdAt!: string;
}