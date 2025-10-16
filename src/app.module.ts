import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { ConditionsModule } from './conditions/conditions.module';
import { AllergiesModule } from './allergies/allergies.module';

@Module({
  imports: [ProfileModule, ConditionsModule, AllergiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
