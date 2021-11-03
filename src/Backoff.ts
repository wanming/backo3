export default class Backoff {
  private min: number;
  private max: number;
  private jitter: number;
  private factor: number;
  private attempts = 0;

  constructor(
    options: {
      min?: number;
      max?: number;
      jitter?: number;
      factor?: number;
    } = {},
  ) {
    this.min = options.min || 100;
    this.max = options.max || 10000;
    this.factor = options.factor || 2;
    this.setJitter(options.jitter);
  }

  public duration() {
    let ms = this.min * Math.pow(this.factor, this.attempts++);

    if (ms === Infinity) {
      return this.max;
    }

    if (this.jitter) {
      const rand = Math.random();
      const deviation = Math.floor(rand * this.jitter * ms);
      ms = Math.floor(ms - deviation + 2 * deviation * rand);
    }
    return Math.min(ms, this.max);
  }

  public reset() {
    this.attempts = 0;
  }

  public setMin(value: number) {
    this.min = value;
  }

  public setMax(value: number) {
    this.max = value;
  }

  public setJitter(value: number) {
    this.jitter = value > 0 && value <= 1 ? value : 0;
  }
}
