import { gql } from "@apollo/client";

export const GET_USER = gql`
	query User($email: String!) {
		user(email: $email) {
			id
            firstName
            lastName
            email
            phone
            giverSessions {
                id
                approved
                status
            }
		}
	}
`;