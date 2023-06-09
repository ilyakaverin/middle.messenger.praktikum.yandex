import { Indexed } from "../interfaces/components";
import { ConnectStatus, StoreEvents } from "../interfaces/enums";
import { EventBus } from "../services/event-bus";
import { set } from "../utils";
class Store extends EventBus {
  private state: Indexed = {
    status: ConnectStatus.DISCONNECTED,
  };
  private messages: Indexed = [];

  public getState() {
    return this.state;
  }
  public getMessages() {
    return this.messages;
  }
  public set(path: string, value: unknown): void {
    set(this.state, path, value);

    // метод EventBus
    this.emit(StoreEvents.Updated);
  }

  public remove(path: string): void {
    delete this.state[path];
    this.emit(StoreEvents.Updated);
  }

  public updateMessages(data: any): void {
    this.messages.push(data);
    this.emit(StoreEvents.Updated);
  }
  public removeMessages(): void {
    this.messages = [];
    this.emit(StoreEvents.Updated);
  }
  public batchEvents(events: unknown[]): void {
    events.forEach((event: Function) => () => event());
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
