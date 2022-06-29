import express, { Request, Response } from 'express';

import { Group, User } from '../models/index';

const addUsersToGroup = async (groupId: any, userIds: any) => {
  const group: any = await Group.findOne({
    where: {
      id: groupId,
    },
  });

  const users: any = await User.findAll({
    where: {
      id: userIds,
    },
  });

  if (group && users.length > 0) {
    return group.addUsers(users);
  }
  return null;
};

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { groupId, userIds } = req.body;

  const UsersAddedToGroup = await addUsersToGroup(groupId, userIds);

  if (!UsersAddedToGroup) {
    res.status(500).send('Error: wrong request data');
  } else {
    res.status(200).send('Users Added To Group');
  }
});

export default router;
