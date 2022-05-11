import Car from '../../domain-layer/entities/Car';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import IAsyncTask from './IAsyncTask';

export type AddCarData = {
    brand: string,
    name: string,
    model: string
};

export default class PostCarTask implements IAsyncTask<Car> {
    private addCarData: AddCarData;

    public constructor(addCarData: AddCarData){
        this.addCarData = addCarData;
    }

    public async execute(): Promise<Car> {
        const databaseConnection = await DatabaseConnection.getInstance();
        const carRepository = databaseConnection.getRepository(Car);

        const car = carRepository.save(this.addCarData)
        
        return car;
    }
}