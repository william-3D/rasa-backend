import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { ConditionsModule } from './conditions/conditions.module';
import { AllergiesModule } from './allergies/allergies.module';
import { RecipesModule } from './recipes/recipes.module';
import { ScraperModule } from './scraper/scraper.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),ProfileModule, ConditionsModule, AllergiesModule, RecipesModule, ScraperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
