import { Subject } from 'rxjs';
import { BroadcastCommand, BroadcastCommandName } from './Domain';

export class BroadcastChannelWrapper {
  private channel: BroadcastChannel;
  private commandsObservable: Subject<BroadcastCommand>;

  constructor(channelName: string) {
    this.channel = new BroadcastChannel(channelName);
    this.commandsObservable = new Subject();

    this.channel.onmessage = (ev) => {
      const command = ev.data as BroadcastCommand;

      this.commandsObservable.next(command);
    };
  }

  subscribe = (commandName: BroadcastCommandName, callback: (args?: { [key: string]: any }) => void) => {
    return this.commandsObservable.subscribe((command) => {
      if (command.name !== commandName) return;

      callback(command.args);
    });
  };

  sendCommand = (broadcastCommand: BroadcastCommand) => {
    try {
      this.channel.postMessage(broadcastCommand);
    } catch (e) {
      console.warn('Unable to broadcast command ', broadcastCommand.name, '. ', e.message);
    }
  };
}
