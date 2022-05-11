import express from 'express';
import { json } from 'body-parser';
import 'reflect-metadata';
import CarsController from './service-layer/controllers/CarsController';
import InventoryIns from './domain-layer/entities/InventoryIns';
import InventoryInsController from './service-layer/controllers/InventoryInsController';

const app = express();
const port = '3001';


app.use(json());

const carsController = new CarsController();
const inventoryInsController = new InventoryInsController();

carsController.mount(app);
inventoryInsController.mount(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
