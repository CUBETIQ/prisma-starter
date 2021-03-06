import { PrismaClient } from "@prisma/client";
import {
  createUser,
  findOneByEmail,
  createProfile,
  findOneProfileByEmail,
} from "../src/User/UserService";

const prisma = new PrismaClient();

// all tests about user
describe("user", function () {
  const email = "sombochea@cubetiqs.com";
  const name = "Sambo Chea";
  const bio = "Software Developer";

  // create user test
  it("createUser", (done) => {
    // create user
    createUser({
      email: email,
      name: name,
    })
      .then((user) => {
        if (user == null) {
          throw Error("user is null");
        }

        expect(user).not.toBeNull();
        expect(email).toBe(user.email);
        expect(name).toBe(user.name);

        // create profile
        createProfile(user, {
          bio: "Software Developer",
        })
          .then((profile) => {
            if (profile == null) {
              throw Error("profile is null");
            }

            expect(profile).not.toBeNull();
            expect(bio).toBe(profile.bio);
          })
          .catch((e) => console.error(e))
          .finally(() => done());
      })
      .catch((e) => console.error(e))
      .finally(() => done());
  });

  // check user test
  it("checkUser", (done) => {
    findOneByEmail(email)
      .then((user) => {
        if (user == null) {
          throw Error("user is null");
        }

        expect(user).not.toBeNull();
        expect(email).toBe(user.email);
        expect(name).toBe(user.name);
      })
      .catch((e) => console.error(e))
      .finally(() => done());
  });

  // check profile included user test
  it("checkProfileUser", (done) => {
    findOneProfileByEmail(email)
      .then((profile) => {
        if (profile == null) {
          throw Error("profile is null");
        }

        expect(profile).not.toBeNull();
        expect(bio).toBe(profile.bio);
        expect(email).toBe(profile.user.email);
        expect(name).toBe(profile.user.name);
      })
      .catch((e) => console.error(e))
      .finally(() => done());
  });

  // try to finish
  afterAll((done) => {
    prisma.$disconnect();

    done();
  });

  // after all
});
