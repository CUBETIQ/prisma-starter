import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

async function isProfileExistByEmail(email: string) {
  const exist = await prisma.profile.count({
    where: {
      user: {
        email: email,
      },
    },
  });

  return exist > 0;
}

async function findOneProfileByEmail(email: string) {
  const profile = await prisma.profile.findFirst({
    where: {
      user: {
        email: email,
      },
    },
  });

  return profile;
}

async function isExistByEmail(email: string) {
  const exist = await prisma.user.count({
    where: {
      email: email,
    },
  });

  return exist > 0;
}

async function findOneByEmail(
  email: string,
  throwableIfNotFound: boolean = false
) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user == null && throwableIfNotFound) {
    throw Error(`user not found by email: ${email}!`);
  }

  return user;
}

async function createUser() {
  const email = "ops@cubetiqs.com";

  if (isExistByEmail(email)) {
    console.log("User existed with email => ", email);
    return findOneByEmail(email);
  }

  const user = await prisma.user.create({
    data: {
      name: "CUBETIQ Solution",
      email: email,
    },
  });

  console.log("User created => ", user);

  return user;
}

async function createProfile(user: User) {
  if (isProfileExistByEmail(user.email)) {
    console.log("Profile existed by email => ", user.email);
    return findOneProfileByEmail(user.email);
  }

  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
      bio: "Software Company",
    },
  });

  console.log("Profile created => ", profile);

  return profile;
}

export { createUser, createProfile };
