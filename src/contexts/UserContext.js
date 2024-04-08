import React from "react";

const UserContext = React.createContext({
  user: {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    clerkId: "",
    imageUrl: "",
    phone: "",
    company: "",
    about: "",
    resumeUrl: "",
  },
});

export default UserContext;
