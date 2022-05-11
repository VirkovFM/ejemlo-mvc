import InventoryIns from "../../domain-layer/entities/InventoryIns";
import DatabaseConnection from "../../persistence-layer/DatabaseConnection";
import FindCarTask from "./FindCarTask";
import IAsyncTask from "./IAsyncTask";

export type AddInventoryInsData = {
    carId: number;
    quantity: number;
};

export default class AddInventoryIns implements IAsyncTask<InventoryIns>{
    private addInventoryInsData: AddInventoryInsData;

    public constructor(addInventoryInsData: AddInventoryInsData){
        this.addInventoryInsData = addInventoryInsData;
    }

    public async execute(): Promise<InventoryIns> {
        const {carId, quantity} = this.addInventoryInsData;

        const findCarTask = new FindCarTask(carId);
        const car = await findCarTask.execute();

        const databaseConnection=await DatabaseConnection.getInstance();
        const inventoryInsRepository = databaseConnection.getRepository(InventoryIns);

        const inventoryIns = await inventoryInsRepository.save({car, quantity, date: new Date()});

        return inventoryIns;
    }
}