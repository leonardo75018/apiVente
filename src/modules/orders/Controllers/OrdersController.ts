import customersRouter from '@modules/customers/routes/customers.routes';
import { compareSync } from 'bcryptjs';
import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';
import FindAllOrders from '../services/ListOrderService';
import ListOrdersService from '../services/ListOrderService';

export default class OrdersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const LisOrder = new ListOrdersService();

        const orders = await LisOrder.execute();

        return response.json(orders);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showOrder = new ShowOrderService();

        const order = await showOrder.execute({ id });

        return response.json(order);
    }

    public async Create(request: Request, response: Response): Promise<Response> {
        const { customer_id, products } = request.body;

        const createOrder = new CreateOrderService();

        const order = await createOrder.execute({ customer_id, products });

        return response.json(order);
    }
}
