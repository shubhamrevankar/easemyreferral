"use client";

import React, { ReactNode, useEffect, useState } from "react";
import UserContext from "./../contexts/UserContext";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";

// Define the type of user object based on your data
export type User = {
  user: any;
};

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // const { data, loading, error } = useQuery(GET_USER, {
  //   variables: { email: "test@test.com" },
  // });

  const [user, setUser] = useState<User>({
    user: null,
  });

  // useEffect(() => {
  //   if (!loading) {
  //     setUser(data);
  //   }
  // }, [loading]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
