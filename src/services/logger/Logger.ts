class Logger {
  readonly history: String[];
  private subscriptions: Function[];

  constructor() {
    this.history = [];
    this.subscriptions = [];
  }

  log(message: String): void {
    const time = (new Date().toLocaleTimeString());
    this.history.push(`${time} - ${message}`);
    this.subscriptions.forEach((subscription: Function) => subscription(message));
  }

  subscribe(subscription: Function): Function {
    this.subscriptions = [
      ...this.subscriptions,
      subscription,
    ];

    return (): void => {
      this.subscriptions = this.subscriptions.filter(
        (sub: Function): Boolean => sub !== subscription,
      );
    };
  }
}

export default Logger;