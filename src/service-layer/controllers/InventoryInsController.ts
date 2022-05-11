import { Request, Response } from "express";
import AddInventoryIns, { AddInventoryInsData } from "../tasks/AddInventoryIns";
import BaseController from "./BaseController";

export default class InventoryInsController extends BaseController{
    public constructor() {
        super('/inventory-ins');
    }

    protected configureRouter(): void {
        this.router.post('/', this.addInventoryIns.bind(this));
    }

    private async addInventoryIns(req: Request, res: Response): Promise<void>{
        try{
            const addCarData = <AddInventoryInsData>req.body;

            const addInventoryInsTask = new AddInventoryIns(addCarData);
            const inventoryIns = await addInventoryInsTask.execute();

            this.respond(res, 200, inventoryIns);
        }catch(e){
            if((<Error>e).message === 'Car no found.'){
                this.respond(res, 404);
            }else{
                this.respond(res, 500);
            }
            
        }
    }
}