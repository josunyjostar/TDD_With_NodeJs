let users = [
  {id: 1, name: 'alice'},
  {id: 2, name: 'bek'},
  {id: 3, name: 'chris'},
];

export const index = (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = Number(req.query.limit);
  if (isNaN(limit)) res.status(400).end();

  res.json(users.slice(0, limit));
};

export const getUserById = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).end();

  const user = users.filter(user => user.id === id)[0];
  if (!user) return res.status(404).end();

  res.json(user);
};

export const deleteUserById = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).end();

  const user = users.filter(user => user.id !== id).length;
  if (!user) return res.status(404).end();
  res.status(204).end();
};

export const createUser = (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();

  const isConflict = users.filter(user => user.name === name).length;
  if (isConflict) return res.status(409).end();

  const id = users[users.length - 1].id + 1;
  const user = {
    id,
    name,
  };
  users.push(user);
  res.status(201).json(user);
};

export const modifyUser = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();

  const user = users.filter(user => {
    return user.id === id;
  })[0];
  if (!user) return res.status(404).end();

  const findName = users.filter(user => {
    return user.name === name;
  })[0];
  if (findName) return res.status(409).end();

  user.name = name;
  res.json(user);
};
