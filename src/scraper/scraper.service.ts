import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma.service';
import axios from 'axios';
import https from 'https';
import { ScrapeRecipesDto } from './dto/scrape-recipes.dto';

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

interface MealDbMeal {
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strSource: string;
  strYoutube: string;
  [key: string]: string;
}

interface MealDbResponse {
  meals: MealDbMeal[] | null;
}

@Injectable()
export class ScraperService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const count = await this.prisma.recipe.count();
    if (count < 100) {
      console.log('Scraping initial recipes...');
      await this.scrapeRecipes({ query: 'chicken' });
      await this.scrapeRecipes({ query: 'pasta' });
      await this.scrapeRecipes({ query: 'vegetarian' });
    }
  }

  @Cron('0 0 * * 0')
  async weeklyUpdate() {
    console.log('Running weekly recipe update...');
    await this.scrapeRecipes({ query: 'healthy' });
  }

  async scrapeRecipes(dto: ScrapeRecipesDto) {
    const response = await axiosInstance.get<MealDbResponse>(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${dto.query}`,
    );

    const meals = response.data.meals || [];
    const created: any[] = [];

    for (const meal of meals) {
      const ingredients: any[] = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push({
            name: ingredient,
            amount: measure || '',
            unit: '',
          });
        }
      }

      const steps = meal.strInstructions
        ? meal.strInstructions.split('\r\n').filter((s: string) => s.trim())
        : [];

      const existing = await this.prisma.recipe.findFirst({
        where: { title: meal.strMeal },
      });

      if (!existing) {
        const recipe = await this.prisma.recipe.create({
          data: {
            title: meal.strMeal,
            description: `${meal.strCategory} - ${meal.strArea}`,
            ingredients,
            steps,
            nutritionInfo: { calories: 0, carbs: 0, protein: 0, fat: 0 },
            region: meal.strArea,
            sourceUrl: meal.strMealThumb || meal.strSource || meal.strYoutube,
          },
        });
        created.push(recipe);
      }
    }

    return { count: created.length, recipes: created };
  }
}
