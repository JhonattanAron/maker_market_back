import { ConfigService } from '@nestjs/config';

export class Variables {
  private static configService: ConfigService = new ConfigService();

  public static port: number = this.configService.get<number>('PORT') || 8080;
}
