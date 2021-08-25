import { Controller, Put, QueryParams } from '@tsed/common';
import { ContentType } from '@tsed/schema';
import { VehicleSocketService } from '../services/VehicleSocketService';

@Controller('/vehicle')
export class VehicleController {
  constructor(private vehicleSocketService: VehicleSocketService) {

  }

  @Put('/command')
  @ContentType('application/json')
  command(@QueryParams('vehicle') vehicle: string, @QueryParams('command') command: string) {
    console.log(command);
    return this.vehicleSocketService.command(vehicle, JSON.parse(command));
  }
}
