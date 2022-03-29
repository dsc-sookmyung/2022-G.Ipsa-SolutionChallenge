import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Story extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    creatorId!: number;

    @Column({ type: 'text' })
    title!: string;

    @Column({ type: 'text' })
    thumbnailImageSrc!: string;

    @Column({ type: 'text' })
    category!: string;

    @Column({ type: 'text' })
    audioFileSrc!: string;

    @Column({ type: 'int', nullable: true })
    duration!: number;

    @Column({ type: 'int', default: 0 })
    likes!: number;

    @Column({
        type: "timestamp", default: () => "CURRENT_TIMESTAMP"
    })
    createdAt!: string;
}