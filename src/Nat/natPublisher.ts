import { connect, StringCodec } from 'nats';

export class NatsPublisher {
  private static client;

  static async getClient() {
    if (!this.client) {
      this.client = await connect({ servers: 'nats://nats:4222' }); 
    }
    return this.client;
  }

  static async publish(subject: string, data: any) {
    const client = await this.getClient();
    const sc = StringCodec();
    client.publish(subject, sc.encode(JSON.stringify(data)));
  }
}