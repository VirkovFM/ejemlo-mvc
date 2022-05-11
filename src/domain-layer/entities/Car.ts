import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export default class Car{
    @PrimaryGeneratedColumn({type: 'int', unsigned: true, zerofill: true})
    public id: number;

    @Column({type: 'varchar', length: 16, nullable: false})
    public brand: string;

    @Column({type: 'varchar', length: 16, nullable: false})
    public name: string;

    @Column({type: 'varchar', length: 16, nullable: false})
    public model: string;

    public constructor(id: number, brand: string, name: string, model: string) {
        this.id = id;
        this.brand = brand;
        this.name = name;
        this.model = model;
    }
}
