const app = require('../index')
const supertest = require('supertest');
const request = supertest(app);

describe('Cadastro de usuário', () => {
  test('Deve cadastrar um usuário com sucesso', () => {
    let time = new Date();
    let email = `${time}@email.com`
    let user = { name: "Anderson", email, password: "12345" }

    return request.post("/user")
      .send(user)
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.email).toEqual(email);
      })
  })
});