import { Injectable, ProviderScope, ProviderType } from '@tsed/common';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  type: ProviderType.SERVICE,
  scope: ProviderScope.SINGLETON,
})
export class GeocodeService {
  search(latitude: number, longitude: number) {
    return axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`)
      .then((response: AxiosResponse<any>) => response.data);
  }
}
