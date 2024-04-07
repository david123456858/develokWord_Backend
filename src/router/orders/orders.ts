import { Router } from "express";
import { saveOrders } from "../../controller/orders/orders";



const routerOrders = Router();
const routeBase:string = '/api/v1/ordenes'

routerOrders.post(`/${routeBase}save`, saveOrders);
routerOrders.get(`/${routeBase}`, saveOrders);

export default routerOrders