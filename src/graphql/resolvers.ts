import { Context } from "@/pages/api/graphql";


export const resolvers = {
	Query: {
		//get user by id
		user: async (_parent: any, args: any, context: Context) => {
			return await context.prisma.user.findUnique({
				where: {
					email: args.email,
				},
			});
		},
	},
	// nested resolve function to get sessions in users
	User: {
		giverSessions: async (parent: any, _args: any, context: Context) => {
			return await context.prisma.session.findMany({
				where: {
					giverUserId: parent.id,
				},
			});
		},
	},
	Mutation: {
		// add user
		createUser: async (_parent: any, args: any, context: Context) => {
			return await context.prisma.user.create({
				data: {
					email: args.email,
					firstName: args.firstName,
					lastName: args.lastName,
					clerkId: args.clerkId,
				},
			});
		},
	},
};