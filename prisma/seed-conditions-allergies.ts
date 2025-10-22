import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create conditions
  const conditions = ['Diabetes', 'GERD', 'Celiac', 'Hypertension'];
  for (const name of conditions) {
    await prisma.condition.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Create allergies
  const allergies = ['Nuts', 'Dairy', 'Shellfish', 'Gluten'];
  for (const name of allergies) {
    await prisma.allergy.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Get all recipes and conditions/allergies
  const recipes = await prisma.recipe.findMany();
  const diabetesCondition = await prisma.condition.findUnique({
    where: { name: 'Diabetes' },
  });
  const gerdCondition = await prisma.condition.findUnique({
    where: { name: 'GERD' },
  });

  const nutsAllergy = await prisma.allergy.findUnique({
    where: { name: 'Nuts' },
  });
  const dairyAllergy = await prisma.allergy.findUnique({
    where: { name: 'Dairy' },
  });
  const glutenAllergy = await prisma.allergy.findUnique({
    where: { name: 'Gluten' },
  });

  // Link recipes to conditions and allergies based on ingredients
  for (const recipe of recipes) {
    const ingredients = JSON.stringify(recipe.ingredients).toLowerCase();

    // Link conditions (recipes suitable for these conditions)
    if (!ingredients.includes('sugar') && !ingredients.includes('honey')) {
      await prisma.recipeCondition.upsert({
        where: {
          recipeId_conditionId: {
            recipeId: recipe.id,
            conditionId: diabetesCondition!.id,
          },
        },
        update: {},
        create: { recipeId: recipe.id, conditionId: diabetesCondition!.id },
      });
    }

    if (
      !ingredients.includes('tomato') &&
      !ingredients.includes('chilli') &&
      !ingredients.includes('spicy')
    ) {
      await prisma.recipeCondition.upsert({
        where: {
          recipeId_conditionId: {
            recipeId: recipe.id,
            conditionId: gerdCondition!.id,
          },
        },
        update: {},
        create: { recipeId: recipe.id, conditionId: gerdCondition!.id },
      });
    }

    // Link allergies (recipes that CONTAIN these allergens)
    if (
      ingredients.includes('nut') ||
      ingredients.includes('peanut') ||
      ingredients.includes('almond')
    ) {
      await prisma.recipeAllergy.upsert({
        where: {
          recipeId_allergyId: {
            recipeId: recipe.id,
            allergyId: nutsAllergy!.id,
          },
        },
        update: {},
        create: { recipeId: recipe.id, allergyId: nutsAllergy!.id },
      });
    }

    if (
      ingredients.includes('milk') ||
      ingredients.includes('cream') ||
      ingredients.includes('cheese') ||
      ingredients.includes('yogurt') ||
      ingredients.includes('butter')
    ) {
      await prisma.recipeAllergy.upsert({
        where: {
          recipeId_allergyId: {
            recipeId: recipe.id,
            allergyId: dairyAllergy!.id,
          },
        },
        update: {},
        create: { recipeId: recipe.id, allergyId: dairyAllergy!.id },
      });
    }

    if (
      ingredients.includes('flour') ||
      ingredients.includes('bread') ||
      ingredients.includes('pasta') ||
      ingredients.includes('wheat')
    ) {
      await prisma.recipeAllergy.upsert({
        where: {
          recipeId_allergyId: {
            recipeId: recipe.id,
            allergyId: glutenAllergy!.id,
          },
        },
        update: {},
        create: { recipeId: recipe.id, allergyId: glutenAllergy!.id },
      });
    }
  }

  console.log('✅ Seeded conditions and allergies successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());
