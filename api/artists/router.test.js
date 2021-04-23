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
    it('responds with a 200 OK', async () => {
      const res = await request(server).get('/api/artists');
      expect(res.status).toBe(200);
    });
  });
  describe('[GET] /artist/:id', () => {
    it('returns corresponding artist', async () => {
      const res1 = await request(server).get('/api/artists/1');
      const res2 = await request(server).get('/api/artists/2');
      const res3 = await request(server).get('/api/artists/3');
      const res4 = await request(server).get('/api/artists/4');

      expect(res1.body).toMatchObject({ artist_name: '4 Non Blondes', artist_id: 1 });
      expect(res2.body).toMatchObject({ artist_name: 'R.E.M', artist_id: 2 });
      expect(res3.body).toMatchObject({ artist_name: 'a-ha', artist_id: 3 });
      expect(res4.body).toMatchObject({ artist_name: 'MF DOOM', artist_id: 4 });
    });
  });
});
