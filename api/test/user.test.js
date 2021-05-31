const app = require('../index')
const supertest = require('supertest');
const request = supertest(app);

let mainUser = {
  name: "Anderson Alpin",
  email: "anderson@email.com",
  password: "12345678"
};

beforeAll(() => {
  return request.post('/user')
    .send(mainUser)
    .then(res => { })
    .catch(err => { console.log(err) })
});

afterAll(() => {
  return request.delete(`/user/${mainUser.email}`)
    .then(res => { })
    .catch(err => { console.log(err) })
})

describe('Cadastro de usuário', () => {
  test('Deve cadastrar um usuário com sucesso', () => {
    let time = new Date();
    let email = `${time}@email.com`;
    let user = { name: "Anderson", email, password: "12345" };

    return request.post("/user")
      .send(user)
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.email).toEqual(email);
      });
  });

  test("Deve impedir que um usuário se cadastre com os dados vazios", () => {
    let user = { name: "", email: "", password: "" };

    return request.post("/user")
      .send(user)
      .then(res => {
        expect(res.statusCode).toEqual(400); //400 = Bad Request
      });
  });

  test("Deve impedir que um usuário se cadastre com um email repetido", () => {
    let time = new Date();
    let email = `${time}@email.com`;
    let user = { name: "Anderson", email, password: "12345" };

    return request.post("/user")
      .send(user)
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.email).toEqual(email);

        return request.post('/user')
          .send(user)
          .then(res => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual("Email já cadastrado.");
          });

      });
  });
});