const db = require('../../data/dbConfig.js');

const getAll = () => {
  return db('artists');
};

const getById = (id) => {
  return db('artists').where({ id }).first();
};

const insert = async (artist) => {
  const [id] = await db('artists').insert(artist);
  return getById(id);
};

const update = async (id, changes) => {
  await db('artists').where({ id }).update(changes);
  return getById(id);
};

const remove = async (id) => {
  const toBeDeleted = getById(id);
  await db('artists').where({ id }).del();
  return toBeDeleted;
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
