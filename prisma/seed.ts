import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function seed() {
  const email = "jaime.cervantes.ve@gmail.com";
  const hashedPassword = await bcrypt.hash("jaime-pw-blog", 10);

  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
  seedPosts(user.id);

  console.log(`Database has been seeded. 🌱`);
}

async function seedPosts(userId: string) {
  const posts = [
    {
      slug: "my-first-post",
      title: "My First Post",
      content: `
        # This is my first post
        
        Isn't it great?
            `.trim(),
      userId,
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
      content: `
        # 90s Mixtape
        
        - I wish (Skee-Lo)
        - This Is How We Do It (Montell Jordan)
        - Everlong (Foo Fighters)
        - Ms. Jackson (Outkast)
        - Interstate Love Song (Stone Temple Pilots)
        - Killing Me Softly With His Song (Fugees, Ms. Lauryn Hill)
        - Just a Friend (Biz Markie)
        - The Man Who Sold The World (Nirvana)
        - Semi-Charmed Life (Third Eye Blind)
        - ...Baby One More Time (Britney Spears)
        - Better Man (Pearl Jam)
        - It's All Coming Back to Me Now (Céline Dion)
        - This Kiss (Faith Hill)
        - Fly Away (Lenny Kravits)
        - Scar Tissue (Red Hot Chili Peppers)
        - Santa Monica (Everclear)
        - C'mon N' Ride it (Quad City DJ's)
      `.trim(),
      userId,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
}
