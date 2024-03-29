import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation AddUser($email: String!, $firstName: String!, $lastName: String, $clerkId: String!, $imageUrl: String) {
        createUser(email: $email, firstName: $firstName, lastName: $lastName, clerkId: $clerkId, imageUrl: $imageUrl) {
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
export const ADD_SESSION = gql`
	mutation AddSession($companyId: String, $giverUserId: String, $receiverUserId: String) {
        createSession(companyId: $companyId, giverUserId: $giverUserId, receiverUserId: $receiverUserId) {
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

export const UPDATE_USER = gql`
	mutation UpdateUser($email: String, $firstName: String, $lastName: String, $phone: String, $about: String, $resumeUrl: String, $companyId: String) {
        updateUser(email: $email, lastName: $lastName, phone: $phone, about: $about, resumeUrl: $resumeUrl, companyId: $companyId) {
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
export const UPDATE_SESSION = gql`
	mutation UpdateSession($id: ID, $approved: String, $status: String, $companyId: String, $formResponse: String, $giverUserId: String, $receiverUserId: String) {
        updateSession(id: $id, approved: $approved, status: $status, companyId: $companyId, formResponse: $formResponse, giverUserId: $giverUserId, receiverUserId: $receiverUserId) {
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