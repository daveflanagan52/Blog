import { Injectable, ProviderScope, ProviderType } from '@tsed/common';
import axios, { AxiosResponse } from 'axios';
import Telegram, { SendBasicOptions } from 'node-telegram-bot-api';

import { Vehicle } from '../entities/Vehicle';

interface LiveLocationSendOptions extends SendBasicOptions {
  live_period: number,
}

@Injectable({
  type: ProviderType.SERVICE,
  scope: ProviderScope.SINGLETON,
})
export class TelegramService {
  _lastLocation: Map<string, [number, number, number]> = new Map();

  _lastBattery: Map<string, [number, number]> = new Map();

  _lastTemperature: Map<string, number> = new Map();

  _speeds: Map<string, number[]> = new Map();

  _bots: Map<string, Telegram> = new Map();

  createBot(token: string) {
    const bot = new Telegram(token, { polling: true });
    this._bots.set(token, bot);
    bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, 'Received your message');
    });
  }

  updateLocation(vehicle: Vehicle, speed: number, latitude: number, longitude: number) {
    if (!vehicle.telegramBotToken || !vehicle.telegramBotChatId) {
      return;
    }

    if (!this._bots.has(vehicle.telegramBotToken)) {
      this.createBot(vehicle.telegramBotToken);
    }
    const bot = this._bots.get(vehicle.telegramBotToken);

    if (this._speeds.has(vehicle.telegramBotToken)) {
      this._speeds.set(vehicle.telegramBotToken, []);
    }
    const speeds = this._speeds.get(vehicle.telegramBotToken) || [];
    speeds.push(speed);
    this._speeds.set(vehicle.telegramBotToken, speeds.slice(-100));

    const averageSpeedStart = speeds.slice(-4).reduce((a, b) => a + b, 0) / 4;
    if (averageSpeedStart >= 5) {
      const last = this._lastLocation.get(vehicle?.telegramBotToken);
      if (last && last[1] === latitude && last[2] === longitude) {
        return;
      }
      if (!last) {
        const options: LiveLocationSendOptions = {
          live_period: 86400,
        };
        bot?.sendLocation(vehicle.telegramBotChatId, latitude, longitude, options)
          .then((message) => {
            this._lastLocation.set(vehicle?.telegramBotToken || '', [
              message.message_id,
              latitude,
              longitude,
            ]);
          });
      } else {
        bot?.editMessageLiveLocation(latitude, longitude, {
          message_id: last[0],
        });
      }
    }

    const averageSpeedEnd = speeds.slice(-20).reduce((a, b) => a + b, 0) / 20;
    if (averageSpeedEnd <= 5) {
      const last = this._lastLocation.get(vehicle.telegramBotToken);
      if (last) {
        const bot = this._bots.get(vehicle.telegramBotToken);
        bot?.stopMessageLiveLocation({
          message_id: last[0],
        });
        this._lastLocation.delete(vehicle.telegramBotToken);
      }
    }
  }

  updateBattery(vehicle: Vehicle, battery: number) {
    if (!vehicle.telegramBotToken || !vehicle.telegramBotChatId) {
      return;
    }
    if (!this._bots.has(vehicle.telegramBotToken)) {
      this.createBot(vehicle.telegramBotToken);
    }
    const bot = this._bots.get(vehicle.telegramBotToken);

    const lastBattery = this._lastBattery.get(vehicle.telegramBotToken || '') || [0, 0];
    if (battery < 30 && lastBattery[1] >= 30) {
      if (lastBattery[0] === 0) {
        bot?.sendMessage(
          vehicle.telegramBotChatId,
          `Hey guys, you might want to plug me in 🔋\nBattery is currently at ${battery.toFixed()}% charge`,
        ).then((message) => {
          this._lastBattery.set(vehicle?.telegramBotToken || '', [message.message_id, battery]);
        });
      } else if (lastBattery[1] !== battery) {
        bot?.editMessageText(
          `Hey guys, you might want to plug me in 🔋\nBattery is currently at ${battery.toFixed()}% charge`,
          { message_id: lastBattery[0] },
        ).then((result) => {
          this._lastBattery.set(vehicle?.telegramBotToken || '', [lastBattery[0], battery]);
        });
      }
    }
    if (lastBattery[0] > 0 && battery >= 30 && lastBattery[1] < 30) {
      bot?.sendMessage(vehicle.telegramBotChatId, 'Powerrrrrrrr! Now it\'s party time 🥳');
      this._lastBattery.set(vehicle?.telegramBotToken || '', [0, battery]);
    }
  }

  updateTemperature(vehicle: Vehicle, temperature: number) {
    if (!vehicle.telegramBotToken || !vehicle.telegramBotChatId) {
      return;
    }
    if (!this._bots.has(vehicle.telegramBotToken)) {
      this.createBot(vehicle.telegramBotToken);
    }
    const bot = this._bots.get(vehicle.telegramBotToken);
  }
}
