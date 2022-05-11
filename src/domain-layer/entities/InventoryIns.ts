import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import Car from './Car'

@Entity()
export default class InventoryIns{
    @PrimaryGeneratedColumn({type: 'int', unsigned: true, zerofill: true})
    public id: number;

    @ManyToOne(()=> Car)
    @JoinColumn()
    public car: Car;

    @Column({type: 'smallint', nullable: false})
    public quantity: number;

    @Column({type: 'datetime', nullable: false})
    public date: Date;


    public constructor(id: number, car:Car, quantity: number, date: Date){
        this.id = id;
        this.car = car;
        this.quantity = quantity;
        this.date = date;
    }
}