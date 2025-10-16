import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Create conditions
  const conditions = await Promise.all([
    prisma.condition.upsert({
      where: { name: 'Diabetes' },
      update: {},
      create: { name: 'Diabetes' },
    }),
    prisma.condition.upsert({
      where: { name: 'GERD' },
      update: {},
      create: { name: 'GERD' },
    }),
    prisma.condition.upsert({
      where: { name: 'Hypertension' },
      update: {},
      create: { name: 'Hypertension' },
    }),
    prisma.condition.upsert({
      where: { name: 'Celiac Disease' },
      update: {},
      create: { name: 'Celiac Disease' },
    }),
  ]);

  // Create allergies
  const allergies = await Promise.all([
    prisma.allergy.upsert({
      where: { name: 'Nuts' },
      update: {},
      create: { name: 'Nuts' },
    }),
    prisma.allergy.upsert({
      where: { name: 'Dairy' },
      update: {},
      create: { name: 'Dairy' },
    }),
    prisma.allergy.upsert({
      where: { name: 'Shellfish' },
      update: {},
      create: { name: 'Shellfish' },
    }),
    prisma.allergy.upsert({
      where: { name: 'Gluten' },
      update: {},
      create: { name: 'Gluten' },
    }),
  ]);

  // Create sample user
  const user = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      passwordHash: 'hashed_password',
      fullName: 'John Doe',
      username: 'johndoe',
    },
  });

  // Connect user to conditions
  await prisma.userCondition.upsert({
    where: {
      userId_conditionId: { userId: user.id, conditionId: conditions[0].id },
    },
    update: {},
    create: { userId: user.id, conditionId: conditions[0].id },
  });

  await prisma.userCondition.upsert({
    where: {
      userId_conditionId: { userId: user.id, conditionId: conditions[1].id },
    },
    update: {},
    create: { userId: user.id, conditionId: conditions[1].id },
  });

  // Connect user to allergies
  await prisma.userAllergy.upsert({
    where: {
      userId_allergyId: { userId: user.id, allergyId: allergies[0].id },
    },
    update: {},
    create: { userId: user.id, allergyId: allergies[0].id },
  });

  console.log('Database seeded successfully!');
  console.log(`User ID: ${user.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
