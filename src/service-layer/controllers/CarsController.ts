import { Request, Response } from "express";
import GetCarListTask from "../tasks/GetCarListTask";
import DeleteCarListTask from "../tasks/DeleteCarTask";
import PostCarListTask, { AddCarData } from "../tasks/PostCarListTask";
import BaseController from "./BaseController";
import Car from "../../domain-layer/entities/Car";
import PutCarTask, { UpdateCarData } from "../tasks/PutCarTask";
import FindCarTask from "../tasks/FindCarTask";

export default class CarsController extends BaseController{
    public constructor(){
        super('/cars');
    }

    protected configureRouter(): void {
        this.router.get('/', this.getCarsList.bind(this));
        this.router.get('/:id', this.findCar.bind(this));
        this.router.put('/', this.putCarsList.bind(this));
        this.router.post('/', this.postCar.bind(this));
        this.router.delete('/:id', this.deleteCarList.bind(this));
    }

    private async getCarsList(req: Request, res: Response): Promise<void>{
        try{
            const getCarListTask = new GetCarListTask();

            const carsList = await getCarListTask.execute();

            this.respond(res, 200, carsList);
        }catch(e){
            if((<Error>e).message === 'Car not found.'){
                this.respond(res, 404);
            }
            else{
                this.respond(res, 500);
            }
        }
        
    }
    private async findCar(req: Request, res: Response): Promise<void>{
        try{ 
            const carId = parseInt(req.params.id);
            const getCarListTask = new FindCarTask(carId);

            const car = await getCarListTask.execute();

            this.respond(res, 200, car);
        }
        catch (e){
            if((<Error>e).message === 'Car not found.'){
                this.respond(res, 404);
            }
            else{
                this.respond(res, 500);
            }
        }
    }
    //agregar todo par crud
    private async putCarsList(req: Request, res: Response): Promise<void>{
        try{
            const carData = <UpdateCarData>req.body;

            const putCarTask = new PutCarTask(carData);

            const putCar = await putCarTask.execute();

            this.respond(res, 200, putCar);
        }
        catch(e){
            if((<Error>e).message === 'Car not found.'){
                this.respond(res, 404);
            }
            else{
                this.respond(res, 500);
            }
        }
    }

    private async postCar(req: Request, res: Response): Promise<void>{
        const carData = <AddCarData>req.body;

        const postCarTask = new PostCarListTask(carData);

        const car = await postCarTask.execute();

        this.respond(res, 200, car);
    }

    private async deleteCarList(req: Request, res: Response): Promise<void>{
        try{
            const carId = parseInt(req.params.id);
            const deleteCarListTask = new DeleteCarListTask(carId);

            await deleteCarListTask.execute();

        this.respond(res, 200);
        }catch(e){
            if((<Error>e).message === 'Car not found.'){
                this.respond(res, 404);
            }
            else{
                this.respond(res, 500);
            }
        }
        
    }
}
