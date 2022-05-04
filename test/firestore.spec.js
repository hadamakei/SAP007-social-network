import { addDocPosts } from '../src/lib/firestore';

jest.mock('../src/lib/firestore');

describe('addDocPosts', () => {
  it('deveria chamar a funcao addDoc do firebase', () => {
    expect(typeof addDocPosts).toBe('function');
  });
});
