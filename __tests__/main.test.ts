import Backoff from '../src/Backoff';

describe('.duration()', () => {
  const min = 100;
  const max = 10000;
  it('should increase the backoff', () => {
    const b = new Backoff({ min, max });

    expect(b.duration()).toBe(100);
    expect(b.duration()).toBe(200);
    expect(b.duration()).toBe(400);
    expect(b.duration()).toBe(800);
    b.reset();
    expect(b.duration()).toBe(100);
    expect(b.duration()).toBe(200);
  });

  it('should increase the backoff with jitter', () => {
    let i = 0;
    const b = new Backoff({ min, max, jitter: 0.5 });

    while (i < 1e3) {
      const d = b.duration();
      const t = 100 * Math.pow(2, i);
      if (d === max) {
        break;
      }
      expect(d).toBeGreaterThan(t * 0.5);
      expect(d).toBeLessThan(t * 1.5);
      i++;
    }
  });

  it('should return max after too many invokes with jitter', () => {
    const b = new Backoff({ min, max, jitter: 0.5 });

    for (let i = 0; i < 1e5; i++) {
      b.duration();
    }
    expect(b.duration()).toBe(max);
  });
});
