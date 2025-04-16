import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Create the context
const SessionContext = createContext();

// Create a provider component
export const SessionProvider = ({ children }) => {
    const [sessionId, setSessionId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize session on component mount
    useEffect(() => {
        const initializeSession = () => {
            // Try to get existing session from localStorage
            const existingSessionId = localStorage.getItem('rc_table_editor_session_id');

            if (existingSessionId) {
                setSessionId(existingSessionId);
            } else {
                // Create a new session ID
                const newSessionId = uuidv4();
                localStorage.setItem('rc_table_editor_session_id', newSessionId);
                setSessionId(newSessionId);
            }

            setIsLoading(false);
        };

        initializeSession();
    }, []);

    // Function to create a new session
    const createNewSession = () => {
        const newSessionId = uuidv4();
        localStorage.setItem('rc_table_editor_session_id', newSessionId);
        setSessionId(newSessionId);
        return newSessionId;
    };

    // Function to clear session
    const clearSession = () => {
        localStorage.removeItem('rc_table_editor_session_id');
        setSessionId(null);
    };

    // Context value
    const contextValue = {
        sessionId,
        isLoading,
        createNewSession,
        clearSession
    };

    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    );
};

// Custom hook for using the session context
export const useSession = () => {
    const context = useContext(SessionContext);

    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }

    return context;
};

export default SessionContext;