import { Request, Response } from 'express';
import * as User from '../../models/user/index.ts';
import Error404 from '../../helpers/error404.ts';

export default {
    async deleteUser(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id, 10);

        const deletedUser = await User.deleteOneUser({ id });

        if (!deletedUser) throw new Error404('This user does not exist');

        return res.status(200).json(deletedUser);
    },
};
