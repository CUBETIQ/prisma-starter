import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  // create user
  await createUser()
    .then((user) => {
      // create profile for user
      createProfile(user);
    })
    .catch((e) => {
      console.error(e);
    });

  const allUsers = await prisma.user.findMany();
  console.log("All users => ", allUsers);
}

async function createUser() {
  const user = await prisma.user.create({
    data: {
      name: "CUBETIQ Solution",
      email: "ops@cubetiqs.com",
    },
  });

  console.log("User => ", user);

  return user;
}

async function createProfile(user: User) {
  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
      bio: "Software Company",
    },
  });

  console.log("Profile => ", profile);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
