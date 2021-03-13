import { PrismaClient } from "@prisma/client";
import { createUser, createProfile } from "./User/UserService";

const prisma = new PrismaClient();

// main function
async function main() {
  // create user
  await createUser()
    .then((user) => {
      if (user != null) {
        // create profile for user
        createProfile(user);
      }
    })
    .catch((e) => {
      console.error(e);
    });

  const allUsers = await prisma.user.findMany();
  console.log("All users => ", allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
