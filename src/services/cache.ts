import {injectable} from 'inversify';
import {Cache} from '../models/index.js';
import debug from '../utils/debug.js';

type Seconds = number;

type Options = {
  expiresIn: Seconds;
  key?: string;
};

const futureTimeToDate = (time: Seconds) => new Date(new Date().getTime() + (time * 1000));

@injectable()
export default class CacheProvider {
  async wrap<T extends [...any[], Options], F>(func: (...options: any) => Promise<F>, ...options: T): Promise<F> {
    if (options.length === 0) {
      throw new Error('Missing cache options');
    }

    const functionArgs = options.slice(0, options.length - 1);

    const {
      key = JSON.stringify(functionArgs),
      expiresIn,
    } = options[options.length - 1] as Options;

    if (key.length < 4) {
      throw new Error(`Cache key ${key} is too short.`);
    }

    const cachedResult = await Cache.findByPk(key);

    if (cachedResult) {
      if (new Date() < cachedResult.expiresAt) {
        debug(`Cache hit: ${key}`);
        return JSON.parse(cachedResult.value) as F;
      }

      await cachedResult.destroy();
    }

    debug(`Cache miss: ${key}`);

    const result = await func(...options as any[]);

    // Save result
    await Cache.upsert({
      key,
      value: JSON.stringify(result),
      expiresAt: futureTimeToDate(expiresIn),
    });

    return result;
  }
}
