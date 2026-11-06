import { checkPassword } from './password.util';

describe('checkPassword', () => {
  it('scores an empty password as 0', () => {
    expect(checkPassword('').score).toBe(0);
  });

  it('scores a strong password as 4', () => {
    const result = checkPassword('Chit@2026Flow');
    expect(result.score).toBe(4);
    expect(result.label).toBe('Strong');
  });
});
