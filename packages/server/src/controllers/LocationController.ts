import {
  Controller, Get, PathParams, QueryParams,
} from '@tsed/common';
import { Returns, ContentType } from '@tsed/schema';

import { BaseController } from './BaseController';
import { Vehicle } from '../entities/Vehicle';

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
    return Vehicle.findOne(undefined, {
      where: { showOnBlog: true },
      relations: ['country'],
    }).then((vehicle: Vehicle) => new Location(vehicle?.country?.code || 'fi', vehicle?.locationGeneral || 'Unknown'));
  }
}
