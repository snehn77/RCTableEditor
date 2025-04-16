import React from 'react';
import { Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    SubmitContainer,
    ChangeSummary,
    ActionButtons
} from './styles';

const SubmitChanges = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        // In a real app, submit changes to the server
        // Then navigate to a success page or dashboard
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                Submit Changes
            </Typography>

            <SubmitContainer>
                <Typography variant="body1" paragraph>
                    You are about to submit the following changes for approval:
                </Typography>

                <ChangeSummary>
                    <Typography variant="body2">Added: 1 row</Typography>
                    <Typography variant="body2">Modified: 2 rows</Typography>
                    <Typography variant="body2">Deleted: 1 row</Typography>
                </ChangeSummary>

                <Typography variant="body2" color="text.secondary" paragraph>
                    Process: 1274
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    Layers: BKTCN, V0RFC
                </Typography>

                <TextField
                    label="Notes for approver (optional)"
                    multiline
                    rows={3}
                    fullWidth
                    placeholder="Add any additional context or information for the approver here..."
                />

                <ActionButtons>
                    <Button variant="outlined" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Confirm Submission
                    </Button>
                </ActionButtons>
            </SubmitContainer>
        </>
    );
};

export default SubmitChanges;