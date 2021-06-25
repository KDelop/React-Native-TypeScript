declare module 'react-native-event-source' {
  export interface IEvent {
    type: string;
    data: any;
  }

  export default class RNEventSource {
    constructor(url: string, options?: Record<string, any>);
    public addEventListener(type: string, listener: (e: IEvent) => void): void;
    public removeAllListeners(): void;
    public removeListener(type: string, listener: (e: IEvent) => void): void;
    public close(): void;
  }
}
