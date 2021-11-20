import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

class ListOrdersService {
    public async execute(): Promise<Order[]> {
        const orsRepository = getCustomRepository(OrdersRepository);

        const orders = orsRepository.find();

        return orders;
    }
}

export default ListOrdersService;
