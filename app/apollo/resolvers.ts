import { prisma } from '~/db.server';

export const resolvers = {
  Query: {
    getPosts() {
      return prisma.post.findMany();
    },
    // parent, args, context, info
    getPost(parent: any, { slug }:any) {
      return prisma.post.findUnique({ where: { slug }});
    }
  },
  Mutation: {
    // parent, args, context, info
    createPost(parent:any, { post }:any) {
      return prisma.post.create({ data: post  });
    }
  }
}