import {DataSource, EntityTarget, Repository} from 'typeorm';
import Car from '../domain-layer/entities/Car';
import InventoryIns from '../domain-layer/entities/InventoryIns';

export default class DatabaseConnection{
    private static instance: DatabaseConnection;

    private dataSource: DataSource;

    private constructor(){
        this.dataSource = new DataSource({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '12345',
            database: 'car_inventory',
            entities: [Car, InventoryIns],
            synchronize: true
        });
    }

    public getRepository<Entity>(target: EntityTarget<Entity>): Repository<Entity>{
        return this.dataSource.getRepository(target);
    }

    public static async getInstance(): Promise<DatabaseConnection>{
        if(!DatabaseConnection.instance){
            DatabaseConnection.instance=new DatabaseConnection();
            await DatabaseConnection.instance.waitForIniatilzed();
        }
        return DatabaseConnection.instance
    }

    private async waitForIniatilzed(): Promise<void>{
        await this.dataSource.initialize();
    }
}