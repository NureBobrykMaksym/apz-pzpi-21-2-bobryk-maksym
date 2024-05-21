import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './db/data-source';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { AttendanceModule } from './attendance/attendance.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { SectorModule } from './sector/sector.module';
import { SensorModule } from './sensor/sensor.module';

@Module({
  imports: [
    LocationModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    ConfigModule.forRoot(),
    AttendanceModule,
    AnalyticsModule,
    SectorModule,
    SensorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
