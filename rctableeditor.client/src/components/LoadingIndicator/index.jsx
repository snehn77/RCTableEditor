import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingIndicator = ({ message = 'Loading...' }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="50vh"
        >
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" mt={2}>
                {message}
            </Typography>
        </Box>
    );
};

export default LoadingIndicator;