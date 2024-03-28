import { gql } from "@apollo/client";

export const GET_USER = gql`
	query User($email: String!) {
		user(email: $email) {
			id
            firstName
            lastName
            email
            phone
            company {
                id
                name
            }
            giverSessions {
                id
                approved
                status
                company {
                    name
                }
                createdAt
                ReceiverUser {
                    email
                }
            }
            receiverSessions {
                id
                approved
                status
                company {
                    name
                }
                createdAt
                GiverUser {
                    email
                }
            }
		}
	}
`;

export const GET_SESSION = gql`
	query Session($id: ID!) {
		session(id: $id) {
			id
            approved
            status
            company {
                id
                name
                questions
            }
            formResponse
            GiverUser{
                id
                name
                email
            }
            ReceiverUser{
                id
                name
                email
            }
            createdAt
            updatedAt
		}
	}
`;