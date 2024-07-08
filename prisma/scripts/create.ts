// crypto
const crypto = require("crypto");
const randomEmail = (n: number): string =>
  crypto.randomBytes(n).toString("base64".substring(0, n)) + "@example.com";

// prisma
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: randomEmail(16),
      password: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      name: "Alice",
      posts: {
        create: [
          {
            title: "First post",
            content: "This is the first post content.",
            published: true,
          },
          {
            title: "Second post",
            content: "This is the second post content.",
          },
        ],
      },
    },
  });

  console.log(user);
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
