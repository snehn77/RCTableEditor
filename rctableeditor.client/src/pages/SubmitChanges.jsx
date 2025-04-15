import React from 'react';
import {
    Container, Typography, Paper, Box, Button,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination,
    TextField, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';

const ChangeHistory = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Change History
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                    <TextField
                        label="Date Range"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: 150 }}
                    />

                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel>Status</InputLabel>
                        <Select label="Status" value="">
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="approved">Approved</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel>Process</InputLabel>
                        <Select label="Process" value="">
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="1274">1274</MenuItem>
                            <MenuItem value="1275">1275</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained" sx={{ mt: 1 }}>Apply</Button>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date/Time</TableCell>
                                <TableCell>Process</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={4} align="center">No history records found</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={0}
                    rowsPerPage={10}
                    page={0}
                    onPageChange={() => { }}
                    onRowsPerPageChange={() => { }}
                />
            </Paper>
        </Container>
    );
};

export default ChangeHistory;