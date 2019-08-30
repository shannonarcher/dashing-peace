import Logger from './Logger';

describe('Logger', () => {
  test('accepting subscriptions, unsubscriptions and logging', () => {
    const subs = [jest.fn(), jest.fn()];
    const logger = new Logger();
    const unsubs = [
      logger.subscribe(subs[0]),
      logger.subscribe(subs[1]),
    ];
    logger.log('hello');

    expect(subs[0]).toHaveBeenCalledWith('hello');
    expect(subs[1]).toHaveBeenCalledWith('hello');

    unsubs[0]();

    logger.log('bye');
    expect(subs[0]).not.toHaveBeenCalledWith('bye');
    expect(subs[1]).toHaveBeenCalledWith('bye');
  });
});