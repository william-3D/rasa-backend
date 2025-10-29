import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma.service';
import axios from 'axios';
import https from 'https';

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

@Injectable()
export class ScraperService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const count = await this.prisma.recipe.count();
    if (count < 100) {
      console.log('Scraping initial recipes...');
      await this.scrapeRecipes('chicken');
      await this.scrapeRecipes('pasta');
      await this.scrapeRecipes('vegetarian');
    }
  }

  @Cron('0 0 * * 0')
  async weeklyUpdate() {
    console.log('Running weekly recipe update...');
    await this.scrapeRecipes('healthy');
  }

  async scrapeRecipes(query: string = 'chicken') {
    const response = await axiosInstance.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );

    const meals = response.data.meals || [];
    const created: any[] = [];

    for (const meal of meals) {
      const ingredients: any[] = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push({ name: ingredient, amount: measure || '', unit: '' });
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
