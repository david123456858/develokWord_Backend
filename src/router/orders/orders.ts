import { Router } from "express";
import { saveOrders } from "../../controller/orders/orders";
import exp from "constants";


const routerOrders = Router();
const routeBase:string = "ordenes"

routerOrders.post(`/${routeBase}save`, saveOrders);
routerOrders.get(`/${routeBase}`, saveOrders);

export default routerOrders