import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
    user_id: string;
    avatarFileName: string;
}

class updateUserAvatarService {
    public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        if (uploadConfig.driver === 's3') {
            const s3Provider = new S3StorageProvider();
            if (user.avatar) {
                await s3Provider.deleteFile(user.avatar);
            }
            const fileName = await s3Provider.saveFile(avatarFileName);
            user.avatar = fileName;
            await usersRepository.save(user);
        } else {
            const diskProvider = new DiskStorageProvider();
            if (user.avatar) {
                await diskProvider.deleteFile(user.avatar);
            }
            const fileName = await diskProvider.saveFile(avatarFileName);

            user.avatar = fileName;

            await usersRepository.save(user);
        }

        return user;
    }
}

export default updateUserAvatarService;
