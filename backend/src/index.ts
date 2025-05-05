import app from "@/app";
import { PrismaClient } from "@prisma/client";

const port = process.env.PORT || 5001;
const prisma = new PrismaClient();

async function main() {
  // await prisma.$connect();
  app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
