import React, { useState } from 'react';
import {
    Typography, Button,
    Table, TableBody, TableCell, TableHead, TableRow, TablePagination,
    TextField, MenuItem, Select, FormControl, InputLabel,
    IconButton, Box, Paper
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    FileDownload as FileDownloadIcon,
    Description as DescriptionIcon,
} from '@mui/icons-material';
import {
    FilterBar,
    FilterControls,
    StatusChip
} from './styles';

const ChangeHistory = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Mock data
    const history = [
        {
            id: 1,
            date: '2025-04-13',
            process: '1274',
            status: 'Approved',
            layers: 'BKTCN, V0RFC',
            changes: '2 added, 1 modified'
        },
        {
            id: 2,
            date: '2025-04-12',
            process: '1274',
            status: 'Pending',
            layers: 'BKTCN',
            changes: '1 added, 3 modified'
        },
        {
            id: 3,
            date: '2025-04-10',
            process: '1274',
            status: 'Rejected',
            layers: 'V0RFC',
            changes: '2 modified, 1 removed'
        }
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                Change History
            </Typography>

            <FilterBar>
                <FilterControls>
                    <TextField
                        label="Date Range"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: 150 }}
                    />

                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel>Status</InputLabel>
                        <Select label="Status" defaultValue="">
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="approved">Approved</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel>Process</InputLabel>
                        <Select label="Process" defaultValue="">
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="1274">1274</MenuItem>
                            <MenuItem value="1275">1275</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained">Apply</Button>
                </FilterControls>
            </FilterBar>

            <Paper>
                <Box sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date/Time</TableCell>
                                <TableCell>Process</TableCell>
                                <TableCell>Layers</TableCell>
                                <TableCell>Changes</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">No history records found</TableCell>
                                </TableRow>
                            ) : (
                                history
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.process}</TableCell>
                                            <TableCell>{row.layers}</TableCell>
                                            <TableCell>{row.changes}</TableCell>
                                            <TableCell>
                                                <StatusChip status={row.status}>
                                                    {row.status}
                                                </StatusChip>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton size="small" title="View Details">
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" title="View in SharePoint">
                                                    <DescriptionIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" title="Download Excel">
                                                    <FileDownloadIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>
                </Box>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={history.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
};

export default ChangeHistory;