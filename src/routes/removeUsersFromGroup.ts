import express, { Request, Response } from 'express';

import { Group, User } from '../models/index';

const removeUsersFromGroup = async (groupId: any, userIds: any) => {
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
    return group.removeUsers(users);
  }
  return null;
};

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { groupId, userIds } = req.body;

  const UsersRemovedToGroup = await removeUsersFromGroup(groupId, userIds);

  if (!UsersRemovedToGroup) {
    res.status(500).send('Error: wrong request data');
  } else {
    res.status(200).send('Users Removed From Group');
  }
});

export default router;
