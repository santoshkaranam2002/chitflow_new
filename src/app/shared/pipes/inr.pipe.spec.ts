import { InrPipe } from './inr.pipe';

describe('InrPipe', () => {
  const pipe = new InrPipe();

  it('uses Indian digit grouping', () => {
    expect(pipe.transform(100000)).toBe('1,00,000');
    expect(pipe.transform(154280)).toBe('1,54,280');
  });

  it('handles empty values', () => {
    expect(pipe.transform(null)).toBe('0');
  });
});
