import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersControllers from '../Controllers/OrdersController';
import insAuthenticated from '@shared/http/middlewares/isAuthenticated';

const ordersRoutes = Router();
const ordersController = new OrdersControllers();

ordersRoutes.use(insAuthenticated);

// ordersRoutes.get('/', ordersController.index);

ordersRoutes.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    ordersController.show,
);

ordersRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().uuid().required(),
            products: Joi.required(),
        },
    }),
    ordersController.Create,
);

export default ordersRoutes;
