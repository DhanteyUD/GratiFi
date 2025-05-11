import app from "@/app";
import { PrismaClient } from "@prisma/client";
import { configKeys } from "./config";

const prisma = new PrismaClient();
const port = configKeys.port;

async function main() {
  await prisma.$connect();
  app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
