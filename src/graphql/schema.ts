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
        getSession(id: ID!): Session
        getCompany(id: ID!): Company
        listUsers: [User!]!
        listSessions: [Session!]!
        listCompanies: [Company!]!
      }
      
      type Mutation {
        createUser(input: CreateUserInput!): User!
      }
      
      input CreateUserInput {
        firstName: String!
        lastName: String
        email: String!
        phone: String
        imageUrl: String
        about: String
        resumeUrl: String
        companyId: String
        clerkId: String!
      }
`;