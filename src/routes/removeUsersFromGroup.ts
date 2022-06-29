import express, { Request, Response } from 'express';

import dataBase from '../data-access/dataBase';

import { Group, User } from '../models/index';

const removeUsersFromGroup = async (groupId: any, userIds: any) => {
  const t = await dataBase.transaction();

  try {
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
      const UsersRemovedToGroup = await group.removeUsers(users);
      await t.commit();
      return UsersRemovedToGroup;
    }
    throw new Error('Incorrect request data');
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { groupId, userIds } = req.body;

  const UsersRemovedToGroup = await removeUsersFromGroup(groupId, userIds);

  if (!UsersRemovedToGroup) {
    throw new Error('Incorrect request data');
  } else {
    res.status(200).send('Users Removed From Group');
  }
});

export default router;
