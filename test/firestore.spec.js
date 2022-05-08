import { addDoc } from '../src/lib/firestore';
import * as exportsFunctions from '../src/lib/exports.js';

jest.mock('../src/lib/exports.js');

it('addDocPosts should add posts with date, message, user name, id, photoUrl, list of likes', async () => {
  exportsFunctions.addDoc.mockResolvedValue({
      data: '07/05/2022 16:00:42',
      mensagem: 'texto',
      user: {
        name: 'nome',
        userId: 'n77CRLrfjbMTvIZgkGs3ckqj7HN2',
        photUrl: '',
      },
      listaLikes: [],
  })
  await addDoc('07/05/2022 16:00:42', 'texto', 'nome','n77CRLrfjbMTvIZgkGs3ckqj7HN2', '', []);
  expect(exportsFunctions.addDoc).toHaveBeenCalledTimes(1);
});

it('addDocPosts should fail to add user post and return error code', async () => {
  jest.clearAllMocks();
  exportsFunctions.addDoc.mockRejectedValue({
    code: 'Fail to add user post',
  })
  try {
    await addDoc('07/05/2022 16:00:42', 'texto', 'nome','n77CRLrfjbMTvIZgkGs3ckqj7HN2', '', []);
  } catch (error) {
    expect(exportsFunctions.addDoc).toHaveBeenCalledTimes(1);
    expect(error.code).toEqual('Fail to add user post');
    //verificar se é chamado com parametros certos
  }
});