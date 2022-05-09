/*
* @jest-enviroment jsdom
*/
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../src/lib/authfirebase';
import * as exportsFunctions from '../src/lib/exports.js';

jest.mock('../src/lib/exports.js');

// console.log(exportsFunctions);

it('loginEmailPassword deveria chamar a funcao signInWithEmailAndPassword para logar usuários', async () => {
  exportsFunctions.signInWithEmailAndPassword.mockResolvedValueOnce();
  await signInWithEmailAndPassword('n77CRLrfjbMTvIZgkGs3ckqj7HN2', 'teste1@teste.com', '654321');
  expect(exportsFunctions.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(exportsFunctions.signInWithEmailAndPassword).toHaveBeenCalledWith('n77CRLrfjbMTvIZgkGs3ckqj7HN2', 'teste1@teste.com', '654321');
});

it('loginEmailPassword should fail to login user and return error code', async () => {
  jest.clearAllMocks();
  exportsFunctions.signInWithEmailAndPassword.mockRejectedValue({
    code: 'Fail to login user',
  });
  try {
    await signInWithEmailAndPassword('n77CRLrfjbMTvIZgkGs3ckqj7HN2', 'teste1@teste.com', '654321');
  } catch (error) {
    expect(exportsFunctions.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(error.code).toEqual('Fail to login user');
    // verificar se é chamado com parametros certos
  }
});

it('createAccount should create user with auth, email and password', async () => {
  exportsFunctions.createUserWithEmailAndPassword.mockResolvedValue({
    user: {},
  });
  await createUserWithEmailAndPassword('n77CRLrfjbMTvIZgkGs3ckqj7HN2', 'teste@teste.com', '123456');
  expect(exportsFunctions.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(exportsFunctions.createUserWithEmailAndPassword).toHaveBeenCalledWith('n77CRLrfjbMTvIZgkGs3ckqj7HN2', 'teste@teste.com', '123456');
  // verificar se user criado é igual o q mockou acima
});

it('createAccount should fail to create user and return error code', async () => {
  jest.clearAllMocks();
  exportsFunctions.createUserWithEmailAndPassword.mockRejectedValue({
    code: 'Fail to create user',
  });
  try {
    await createUserWithEmailAndPassword('n77CRLrfjbMTvIZgkGs3ckqj7HN2', 'teste@teste.com', '123456');
  } catch (error) {
    expect(exportsFunctions.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(error.code).toEqual('Fail to create user');
    // verificar se é chamado com parametros certos
  }
});
