import { Context } from "@/pages/api/graphql";


export const resolvers = {
	Query: {
		//get user by email
		user: async (_parent: any, args: any, context: Context) => {
			return await context.prisma.user.findUnique({
				where: {
					email: args.email,
				},
			});
		},
		//get session by id
		session: async (_parent: any, args: any, context: Context) => {
			return await context.prisma.session.findUnique({
				where: {
					id: args.id,
				},
			});
		},
		//get company by id
		company: async (_parent: any, args: any, context: Context) => {
			return await context.prisma.company.findUnique({
				where: {
					id: args.id,
				},
			});
		},

		users: async (_parent: any, args: any, context: Context) => {
			return await context.prisma.user.findMany({
				include: { giverSessions: true, receiverSessions: true },
			});
		},
		//get session by id
		sessions: async (_parent: any, args: any, context: Context) => {
			return await context.prisma.session.findMany({
				include: { GiverUser: true, ReceiverUser: true },
			});
		},
		//get company by id
		companies: async (_parent: any, args: any, context: Context) => {
			return await context.prisma.company.findMany({});
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
		receiverSessions: async (parent: any, _args: any, context: Context) => {
			return await context.prisma.session.findMany({
				where: {
					receiverUserId: parent.id,
				},
			});
		},
		company: async (parent: any, _args: any, context: Context) => {
			return await context.prisma.session.findUnique({
				where: {
					id: parent.companyId,
				},
			});
		},
	},
	Session: {
		GiverUser: async (parent: any, _args: any, context: Context) => {
			return await context.prisma.session.findUnique({
				where: {
					id: parent.giverUserId,
				},
			});
		},
		ReceiverUser: async (parent: any, _args: any, context: Context) => {
			return await context.prisma.session.findUnique({
				where: {
					id: parent.receiverUserId,
				},
			});
		},
		company: async (parent: any, _args: any, context: Context) => {
			return await context.prisma.session.findUnique({
				where: {
					id: parent.companyId,
				},
			});
		},
	},
	Company: {
		User: async (parent: any, _args: any, context: Context) => {
			return await context.prisma.user.findMany({
				where: {
					companyId: parent.id,
				},
			});
		},
		Session: async (parent: any, _args: any, context: Context) => {
			return await context.prisma.session.findMany({
				where: {
					companyId: parent.id,
				},
			});
		},
	},
	Mutation: {
		// add user
		createUser: async (_parent: any, args: any, context: Context) => {
			// const registeredUser = await context.prisma.user.findUnique({
			// 	where: {
			// 		email: args.email,
			// 	},
			// });
			// if(registeredUser){
			// 	return registeredUser
			// }
			return await context.prisma.user.create({
				data: {
					email: args.email,
					firstName: args.firstName,
					lastName: args.lastName,
					clerkId: args.clerkId,
					imageUrl: args.imageUrl,
				},
			});
		},
		// update user
		updateUser: async (_parent: any, args: any, context: Context) => {
			return await context.prisma.user.update({
				where: {
					email: args.email,
				},
				data: {
					firstName: args.firstName,
					lastName: args.lastName,
					phone: args.phone,
					about: args.about,
					resumeUrl: args.resumeUrl,
					companyId: args.companyId,
				},
			});
		},
		// add session
		createSession: async (_parent: any, args: any, context: Context) => {
			return await context.prisma.session.create({
				data: {
					companyId: args.companyId,
					giverUserId: args.giverUserId,
					receiverUserId: args.receiverUserId,
				},
			});
		},
		// update session
		updateSession: async (_parent: any, args: any, context: Context) => {
			return await context.prisma.session.update({
				where: {
					id: args.id,
				},
				data: {
					approved: args.approved,
					status: args.status,
					companyId: args.companyId,
					formResponse: args.formResponse,
					giverUserId: args.giverUserId,
					receiverUserId: args.receiverUserId,
				},
			});
		},
	},
};