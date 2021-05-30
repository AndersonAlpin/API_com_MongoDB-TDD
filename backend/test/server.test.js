const app = require('../index')
const supertest = require('supertest');
const request = supertest(app);

test("A aplicação deve responder na porta 8686", () => {
  return request.get('/').then(res => {
    let status = res.statusCode;
    expect(status).toEqual(200);
  }).catch(err => {
    fail(err);
  })
});