import { PrismaClient, User } from "@prisma/client";
import ProfileRequest from "../Model/ProfileRequest";
import UserRequest from "../Model/UserRequest";

const prisma = new PrismaClient();

function isProfileExistByEmail(email: string) {
  const exist = prisma.profile.count({
    where: {
      user: {
        email: email,
      },
    },
  });

  return exist.then((c) => c > 0).catch((e) => 0);
}

async function findOneProfileByEmail(email: string) {
  const profile = await prisma.profile.findFirst({
    where: {
      user: {
        email: email,
      },
    },
    include: {
      user: true,
    },
  });

  return profile;
}

function isExistByEmail(email: string) {
  const exist = prisma.user.count({
    where: {
      email: email,
    },
  });

  return exist.then((c) => c > 0).catch((e) => 0);
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

async function createUser(request: UserRequest) {
  if (isExistByEmail(request.email)) {
    return findOneByEmail(request.email);
  }

  const user = await prisma.user.create({
    data: {
      name: request.name,
      email: request.email,
    },
  });

  console.log("User created => ", user);

  return user;
}

async function createProfile(user: User, request: ProfileRequest) {
  if (isProfileExistByEmail(user.email)) {
    return findOneProfileByEmail(user.email);
  }

  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
      bio: request.bio,
    },
  });

  console.log("Profile created => ", profile);

  return profile;
}

export { createUser, createProfile, findOneByEmail, findOneProfileByEmail };
