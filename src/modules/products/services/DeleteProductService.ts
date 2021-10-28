import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepositories';

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

        await productsRepository.remove(product);
    }
}

export default DeleteProductService;
