import express, { Request, Response } from 'express';

import { Group, User } from '../models/index';

const addUsersToGroup = async (groupId: any, userId: any) => {
  const group: any = await Group.findOne({
    where: {
      id: groupId,
    },
  });

  const user: any = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (group && user) {
    return group.addUser(user);
  }
  return null;
};

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { groupId, userId } = req.body;

  const UserAddedToGroup = await addUsersToGroup(groupId, userId);

  if (!UserAddedToGroup) {
    res.status(500).send('Err');
  } else {
    res.status(200).send('User Added To Group');
  }
});

export default router;
