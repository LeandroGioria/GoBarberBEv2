import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarServices';
import ensureAuthenticated from '../middlewares/ensureAutenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // Not return password information
    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = await new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id, // Setted by middleware ensureAutenticated
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
