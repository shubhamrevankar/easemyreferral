"use client";

import React, { ReactNode, useEffect, useState } from "react";
import UserContext from "./../contexts/UserContext";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import { useUser } from "@clerk/nextjs";

// Define the type of user object based on your data
export type User = {
  user: any;
};

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

  
  const { isLoaded, isSignedIn, user } = useUser();

  // console.log(user)

//   {
//     "pathRoot": "/me",
//     "id": "user_2eBlQZjtlUaiJ61FkarSxmZfeEA",
//     "externalId": null,
//     "username": null,
//     "emailAddresses": [
//         {
//             "pathRoot": "/me/email_addresses",
//             "emailAddress": "shubhamsrevankar8668@gmail.com",
//             "linkedTo": [
//                 {
//                     "pathRoot": "",
//                     "id": "idn_2eBlQAVd0n13EdvlhUGq6xG9nYQ",
//                     "type": "oauth_linkedin_oidc"
//                 }
//             ],
//             "id": "idn_2eBlQCHSCaGDJyV97MUQQy0eD92",
//             "verification": {
//                 "pathRoot": "",
//                 "status": "verified",
//                 "strategy": "from_oauth_linkedin_oidc",
//                 "nonce": null,
//                 "externalVerificationRedirectURL": null,
//                 "attempts": null,
//                 "expireAt": "2024-04-05T17:14:29.805Z",
//                 "error": null
//             }
//         }
//     ],
//     "phoneNumbers": [],
//     "web3Wallets": [],
//     "externalAccounts": [
//         {
//             "pathRoot": "/me/external_accounts",
//             "providerUserId": "Ziw0woV_X2",
//             "emailAddress": "shubhamsrevankar8668@gmail.com",
//             "approvedScopes": "email openid profile",
//             "firstName": "Shubham",
//             "lastName": "Revankar",
//             "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL21lZGlhLmxpY2RuLmNvbS9kbXMvaW1hZ2UvQzRFMDNBUUZJSVZvT1B0QVdOdy9wcm9maWxlLWRpc3BsYXlwaG90by1zaHJpbmtfMTAwXzEwMC8wLzE2Mzg1NTA2MTE3NTY/ZT0xNzE3NjMyMDAwXHUwMDI2dj1iZXRhXHUwMDI2dD1wQVNMZE9VY0pmTTM5RjlhNnFFZzVlQTJOR3M4dmJMTWJFdUN0Y29acjdVIiwicyI6IjZjOHZMZGRTTnZSQ2tHWGdUOUs0K0xCRFRVMTJWTkdNRUozNGI3NjUwbm8ifQ",
//             "username": "",
//             "publicMetadata": {},
//             "label": null,
//             "verification": {
//                 "pathRoot": "",
//                 "status": "verified",
//                 "strategy": "oauth_linkedin_oidc",
//                 "nonce": null,
//                 "externalVerificationRedirectURL": null,
//                 "attempts": null,
//                 "expireAt": "2024-03-25T17:06:59.590Z",
//                 "error": null
//             },
//             "id": "eac_2eBlQEdBttoylxma1YsxoVvhJ9H",
//             "identificationId": "idn_2eBlQAVd0n13EdvlhUGq6xG9nYQ",
//             "provider": "linkedin_oidc"
//         }
//     ],
//     "samlAccounts": [],
//     "organizationMemberships": [],
//     "passwordEnabled": false,
//     "firstName": "Shubham",
//     "lastName": "Revankar",
//     "fullName": "Shubham Revankar",
//     "primaryEmailAddressId": "idn_2eBlQCHSCaGDJyV97MUQQy0eD92",
//     "primaryEmailAddress": {
//         "pathRoot": "/me/email_addresses",
//         "emailAddress": "shubhamsrevankar8668@gmail.com",
//         "linkedTo": [
//             {
//                 "pathRoot": "",
//                 "id": "idn_2eBlQAVd0n13EdvlhUGq6xG9nYQ",
//                 "type": "oauth_linkedin_oidc"
//             }
//         ],
//         "id": "idn_2eBlQCHSCaGDJyV97MUQQy0eD92",
//         "verification": {
//             "pathRoot": "",
//             "status": "verified",
//             "strategy": "from_oauth_linkedin_oidc",
//             "nonce": null,
//             "externalVerificationRedirectURL": null,
//             "attempts": null,
//             "expireAt": "2024-04-05T17:14:29.805Z",
//             "error": null
//         }
//     },
//     "primaryPhoneNumberId": null,
//     "primaryPhoneNumber": null,
//     "primaryWeb3WalletId": null,
//     "primaryWeb3Wallet": null,
//     "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfbGlua2VkaW5fb2lkYy9pbWdfMmVCbFFZWDR0VTRyS0V6NkJsdTZvQ2hFaDhHIn0",
//     "hasImage": true,
//     "twoFactorEnabled": false,
//     "totpEnabled": false,
//     "backupCodeEnabled": false,
//     "publicMetadata": {},
//     "unsafeMetadata": {},
//     "createOrganizationEnabled": true,
//     "deleteSelfEnabled": true,
//     "lastSignInAt": "2024-04-05T16:14:01.613Z",
//     "updatedAt": "2024-04-05T16:14:01.652Z",
//     "createdAt": "2024-03-25T16:57:16.062Z",
//     "cachedSessionsWithActivities": null
// }



  const [dbUser, setDbUser] = useState<any>({});

  useEffect(() => {
    if(isLoaded){
      fetch(`${process.env.GOOGLE_SHEETS_URL}?route=createUser&firstName=${user?.firstName}&lastName=${user?.lastName}&email=${user?.primaryEmailAddress?.emailAddress}&clerkId=${user?.id}&imageUrl=${user?.imageUrl}`,{method: 'POST',})
        .then((res) => res.json())
        .then((data) => {
          setDbUser(data)
        })
    }
  }, [isLoaded])

  // console.log(dbUser)

//   {
//     "userId": "YzAyNzJlOTctY2Q0Yi00MmFjLTg2MmUtNmFiMzYyOTQxOTY3",
//     "firstName": "Shubham",
//     "lastName": "Revankar",
//     "email": "shubhamsrevankar8668@gmail.com",
//     "clerkId": "user_2eBlQZjtlUaiJ61FkarSxmZfeEA",
//     "imageUrl": "",
//     "phone": "",
//     "company": "",
//     "about": "",
//     "resumeUrl": ""
// }

  return <UserContext.Provider value={{user:dbUser}}>{children}</UserContext.Provider>;
};

export default UserProvider;
