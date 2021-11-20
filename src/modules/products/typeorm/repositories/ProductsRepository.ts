import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Products';

interface IFindProducts {
    id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    public async findByName(name: string): Promise<Product | undefined> {
        const prodtuct = this.findOne({
            where: {
                name,
            },
        });
        return prodtuct;
    }


    public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const prodtuctIdts = products.map(product => product.id);

        const existsProducts = await this.find({
            where: {
                id: In(prodtuctIdts),
            },
        });

        return existsProducts;
    }
}
