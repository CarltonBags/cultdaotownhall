import React, {createContext, useState } from "react";

export const VoteContext = createContext();

export const VoteProvider = ({children}) => {
    const [votes, setVotes] = useState({});

    return (
        <VoteContext.Provider value={{ votes, setVotes }} >
            {children}
        </VoteContext.Provider>
    );
};