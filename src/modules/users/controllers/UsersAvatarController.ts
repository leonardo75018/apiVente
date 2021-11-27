import { Request, Response } from 'express';
import updateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateAvatar = new updateUserAvatarService();

        const user = await updateAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });

        return response.json(user);
    }
}
