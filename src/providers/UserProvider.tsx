"use client";

import React, { ReactNode, useEffect, useState } from "react";
import UserContext from "./../contexts/UserContext";
import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "@clerk/nextjs";
import { ADD_USER } from "@/graphql/mutations";

// Define the type of user object based on your data
export type User = {
  user: any;
};

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  // console.log(user);

  const [AddUser, { data }] = useMutation(ADD_USER);

  const [currentuser, setCurrentuser] = useState<User>({
    user: null,
  });

  useEffect(() => {
    if (isLoaded) {
      setCurrentuser({
        user:user
      });
      AddUser({
        variables: {
          email: user?.primaryEmailAddress?.emailAddress,
          firstName: user?.firstName,
          lastName: user?.lastName,
          clerkId: user?.id,
          imageUrl: user?.imageUrl,
        },
      });
    }
  }, [isLoaded]);

  return (
    <UserContext.Provider value={currentuser}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
