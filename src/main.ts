import { PrismaClient } from "@prisma/client";
import { createUser, createProfile } from "./User/UserService";

const prisma = new PrismaClient();

// main function
async function main() {
  const email = "ops@cubetiqs.com";
  const name = "CUBETIQ Solution";

  // create user
  await createUser(
    {
      name: name,
      email: email,
    }
  )
    .then((user) => {
      if (user != null) {
        // create profile for user
        createProfile(user, {
          bio: "Software Developer",
        });
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
