import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';

import usersRoutes from './routes/users';
import groupsRoutes from './routes/groups';

import addUsersToGroupRouter from './routes/addUsersToGroup';
import removeUsersFromGroupRouter from './routes/removeUsersFromGroup';

const app = express();

app.use((req, res, next) => {
  express.json()(req, res, (err) => {
    if (err) {
      return res.sendStatus(400);
    }

    return next();
  });
});

app.use('/api/users', usersRoutes);
app.use('/api/groups', groupsRoutes);

app.use('/api/addUsersToGroup', addUsersToGroupRouter);
app.use('/api/removeUsersFromGroup', removeUsersFromGroupRouter);

app.use((req, res) => {
  const err = {
    status: 404,
    message: 'URL not found',
  };

  res.status(404).json(err);
});

// eslint-disable-next-line
app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(err.status || 500).send(err.message);
  }
});

export default app;
