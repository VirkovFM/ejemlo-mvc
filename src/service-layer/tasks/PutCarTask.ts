import Car from '../../domain-layer/entities/Car';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import FindCarTask from './FindCarTask';
import IAsyncTask from './IAsyncTask';

export type UpdateCarData = {
    id: number,
    brand: string,
    name: string,
    model: string
};

export default class PutCarTask implements IAsyncTask<Car> {
    private updateCarData: UpdateCarData;

    public constructor(updateCarData: UpdateCarData){
        this.updateCarData = updateCarData;
    }

    public async execute(): Promise<Car> {
        const findCarTask = new FindCarTask(this.updateCarData.id)

        const car = await findCarTask.execute();

        car.brand = this.updateCarData.brand;
        car.name = this.updateCarData.name;
        car.model = this.updateCarData.model;

        const databaseConnection = await DatabaseConnection.getInstance();
        const carRepository = databaseConnection.getRepository(Car);

        carRepository.save(car);
        
        return car;
    }
}