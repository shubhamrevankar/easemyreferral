export const typeDefs = `#graphql 
    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        phone: String
        imageUrl: String
        about: String
        resumeUrl: String
        companyId: String
        company: Company
        clerkId: String!
        createdAt: String!
        updatedAt: String!
        giverSessions: [Session!]!
        receiverSessions: [Session!]!
    }
    
    type Session {
        id: ID!
        approved: Boolean!
        status: Status!
        companyId: String!
        company: Company!
        formResponse: String
        giverUserId: String
        GiverUser: User
        receiverUserId: String
        ReceiverUser: User
        createdAt: String!
        updatedAt: String!
    }
    
    type Company {
        id: ID!
        name: String!
        questions: String
        User: [User!]!
        Session: [Session!]!
    }
    
    enum Status {
        NOTACTIVE
        ACTIVE
    }
    type Query {
        user(email: String!): User
        session(id: ID!): Session
        company(id: ID!): Company
        users: [User!]!
        sessions: [Session!]!
        companies: [Company!]!
      }
      
      type Mutation {
        createUser(
          firstName: String!,
          lastName: String,
          email: String!,
          phone: String,
          imageUrl: String,
          about: String,
          resumeUrl: String,
          companyId: String,
          clerkId: String!
        ): User!
        updateUser(
          firstName: String!,
          lastName: String,
          email: String!,
          phone: String,
          imageUrl: String,
          about: String,
          resumeUrl: String,
          companyId: String,
          clerkId: String!
        ): User!
        createSession(
          companyId: String!
          giverUserId: String!
          receiverUserId: String!
        ): Session!
        updateSession(
          id: ID!
          approved: Boolean
          status: Status
          companyId: String
          formResponse: String
          giverUserId: String
          receiverUserId: String
        ): Session!
      }
      
      # input UserInput {
      #   firstName: String!,
      #   lastName: String,
      #   email: String!,
      #   phone: String,
      #   imageUrl: String,
      #   about: String,
      #   resumeUrl: String,
      #   companyId: String,
      #   clerkId: String!
      # }

      # input SessionInput {
      #   id: ID
      #   approved: Boolean
      #   status: Status
      #   companyId: String!
      #   formResponse: String
      #   giverUserId: String!
      #   receiverUserId: String!
      # }
`;