import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IResquest {
    id: string;
}

class DeleteProductService {
    public async execute({ id }: IResquest): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found.');
        }


        await RedisCache.invalidate('api-ventes-PRODUCTS_LIST');

        await productsRepository.remove(product);
    }
}

export default DeleteProductService;
