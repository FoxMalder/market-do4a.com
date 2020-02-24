// let instance = null;

class EventBus {
  constructor() {
    if (EventBus.instance) {
      return EventBus.instance;
    }

    this.events = {};
    EventBus.instance = this;
  }

  $emit(event, message) {
    if (!this.events[event]) return;
    const callbacks = this.events[event];
    for (let i = 0, l = callbacks.length; i < l; i++) {
      const callback = callbacks[i];
      callback.call(this, message);
    }
  }

  $on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }
}

export default EventBus;
