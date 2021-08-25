import {
  Controller, Get, PathParams, QueryParams,
} from '@tsed/common';
import { Returns, ContentType } from '@tsed/schema';

import { BaseController } from './BaseController';
import { DataPacket } from '../entities/DataPacket';

class Location {
  country: string;

  name: string;

  constructor(country: string, name: string) {
    this.country = country.toLowerCase();
    this.name = name;
  }
}

@Controller('/location')
export class LocationController extends BaseController {
  @Get('/')
  @ContentType('application/json')
  @Returns(200, Location)
  find(): Promise<Location> {
    return DataPacket.findOne(undefined, {
      relations: ['country'],
      order: {
        createdAt: 'DESC',
      },
    }).then((dataPacket: DataPacket) => new Location(dataPacket?.country?.code || 'fi', dataPacket?.location_general || 'Unknown'));
  }
}
