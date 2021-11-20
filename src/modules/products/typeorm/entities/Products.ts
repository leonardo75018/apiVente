import Orders_products from '@modules/orders/typeorm/entities/OrdersProducts';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Orders_products, order_products => order_products.product)
    order_products: Orders_products[];

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Product;
