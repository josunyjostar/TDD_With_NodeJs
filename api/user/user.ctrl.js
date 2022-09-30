import {User} from '../../models.js';

export const index = (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = Number(req.query.limit);
  if (isNaN(limit)) res.status(400).end();

  User.findAll({limit}).then(users => res.json(users));
};

export const getUserById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).end();

  const user = await User.findOne({where: {id}});
  if (!user) return res.status(404).end();

  res.json(user);
};

export const deleteUserById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).end();

  const user = await User.destroy({where: {id}});
  if (!user) return res.status(404).end();
  res.status(204).end();
};

export const createUser = async (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();
  let user = {};
  try {
    user = await User.create({name});
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') return res.status(409).end(err);
    else return res.status(500).end(err);
  }

  res.status(201).json(user);
};

export const modifyUser = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();

  const user = await User.findOne({where: {id}});
  if (!user) return res.status(404).end();
  user.name = name;

  try {
    await user.save();
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') return res.status(409).end(err);
    else return res.status(500).end(err);
  }

  res.json(user);
};
