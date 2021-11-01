import { getCustomRepository } from 'typeorm';
import User from '../typeOrm/entities/User';
import UsersRepositoriey from '../typeOrm/repositories/UsersRepositories';

class ListUserService {
    public async execute(): Promise<User[]> {
        const userRepository = getCustomRepository(UsersRepositoriey);

        const users = userRepository.find();

        return users;
    }
}

export default ListUserService;
