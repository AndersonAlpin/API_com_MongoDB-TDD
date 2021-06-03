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

describe("Autenticação", () => {
  test("Deve retornar um token quando o usuário logar", () => {
    return request.post("/auth")
      .send({ email: mainUser.email, password: mainUser.password })
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.token).toBeDefined();
      })
  })

  test("Deve impedir que um usuário não cadastro se logue", () => {
    return request.post("/auth")
      .send({ email: 'mainUser.email', password: 'mainUser.password' })
      .then(res => {
        expect(res.statusCode).toEqual(403);
        expect(res.body.errors.email).toEqual("Email não cadastrado.");
      })
  })

  test("Deve impedir que um usuário se logue com uma senha incorreta", () => {
    return request.post("/auth")
      .send({ email: mainUser.email, password: 'mainUser.password' })
      .then(res => {
        expect(res.statusCode).toEqual(403);
        expect(res.body.errors.password).toEqual("Senha incorreta.");
      })
  })
});