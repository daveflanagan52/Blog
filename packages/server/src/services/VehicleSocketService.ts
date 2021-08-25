import {
  IO, Nsp, Socket, SocketService, SocketSession, Input, Namespace, Args,
} from '@tsed/socketio';
import * as SocketIO from 'socket.io';
import { Country } from '../entities/Country';
import { DataPacket } from '../entities/DataPacket';
import { Vehicle } from '../entities/Vehicle';
import { GeocodeService } from './GeocodeService';

const addressGeneralKeys = [
  'county',
  'country',
];
const addressSpecificKeys = [
  'house_number',
  'road',
  'city',
  'county',
  'postcode',
  'country',
];

const withTimeout = (onSuccess: Function, onTimeout: Function, timeout: number) => {
  let called = false;

  const timer = setTimeout(() => {
    if (called) return;
    called = true;
    onTimeout();
  }, timeout);

  return (...args: any[]) => {
    if (called) return;
    called = true;
    clearTimeout(timer);
    onSuccess.apply(this, args);
  };
};

@SocketService('vehicle')
export class VehicleSocketService {
  @Nsp nsp: SocketIO.Namespace;

  public vehicles: Map<string, { vehicle: Vehicle, socket: SocketIO.Socket, session: SocketSession }> = new Map();

  constructor(@IO private io: SocketIO.Server, private geocodeService: GeocodeService) { }

  $onConnection(@Socket socket: SocketIO.Socket, @SocketSession session: SocketSession) {
    console.log('=====   CONNECTED A CLIENT   =====');
    console.log(`===== SOCKET ID ${socket.id} =====`);

    const key = socket.handshake.query?.key || socket.id;
    socket.send(key);
    Vehicle.findOneOrFail(undefined, { where: { key } })
      .then((vehicle: Vehicle) => {
        this.vehicles.set(socket.id, { vehicle, socket, session });
      })
      .catch(() => socket.disconnect());
  }

  command(vehicle: string, command: object) {
    const v = this.vehicles.get(vehicle);
    if (!v || v.socket.disconnected) {
      return Promise.resolve({ error: `connection to ${vehicle} not established` });
    }
    return new Promise((resolve) => {
      v.socket.emit('command', JSON.stringify(command), withTimeout((response: string) => {
        resolve(JSON.parse(response));
      }, () => {
        resolve({ error: `${vehicle} took too long to reply` });
      }, 5000));
    });
  }

  @Input('dataPing')
  dataPing(@Args(0) data: DataPacket, @Socket socket: Socket, @Namespace nsp: Namespace) {
    const v = this.vehicles.get(socket.id);
    if (!v || v.socket.disconnected) {
      return Promise.resolve({ error: `connection to ${v?.vehicle.key} not established` });
    }
    this.geocodeService.search(data.latitude, data.longitude)
      .then(async (response) => {
        const country = await Country.findOne(undefined, { where: { code: response?.address?.country_code.toUpperCase() || '' } });
        data.location_general = Object.keys(response?.address || {}).filter((key) => addressGeneralKeys.includes(key)).map((key) => response?.address[key]).join(' ');
        data.location_specific = Object.keys(response?.address || {}).filter((key) => addressSpecificKeys.includes(key)).map((key) => response?.address[key]).join(' ');
        data.vehicle = v?.vehicle;
        data.country = country;
        data.save();
      });
  }
}
