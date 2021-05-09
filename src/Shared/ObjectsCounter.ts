export class Monitor {
  public static printInstance(): string {
    let response = "";
    Counter.objectsCount.forEach((value: number, key: string) => {
      response = response + `${key}: ${value} \n`;
    });

    return response;
  }
}

class Counter {
  static objectsCount: Map<string, number> = new Map();

  static increment(className: string) {
    if (!this.objectsCount.get(className)) {
      this.objectsCount.set(className, 1);
    } else {
      const currentValue = this.objectsCount.get(className);
      this.objectsCount.set(className, currentValue! + 1);
    }
  }
}

export function countInstances<T extends { new (...args: any[]): any }>(
  constructor: T
) {
  return class extends constructor {
    abc = Counter.increment(constructor.name);
  };
}
