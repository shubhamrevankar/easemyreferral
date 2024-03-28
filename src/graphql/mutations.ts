import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation AddUser($email: String, $firstName: String, $lastName: String, $clerkId: String) {
        createUser(email: $email, firstName: $firstName, lastName: $lastName, clerkId: $clerkId) {
			id
            firstName
            lastName
            email
            phone
            giverSessions {
                id
                approved
                status
                companyId
                company
            }
		}
	}
`;