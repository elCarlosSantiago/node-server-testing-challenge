const server = require('../server');
const request = require('supertest');
const db = require('../../data/dbConfig');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db('artists').truncate();
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

it('process.env.NODE_ENV must be "testing"', () => {
  expect(process.env.NODE_ENV).toBe('testing');
});

describe('Artists enpoints', () => {
  describe('[GET] /artists', () => {
    it('returns all the artists', async () => {
      const res = await request(server).get('/api/artists');
      expect(res.body).toHaveLength(4);
    });
  });
});
