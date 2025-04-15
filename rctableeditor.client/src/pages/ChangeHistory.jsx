import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container, Typography, Button, Box, Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, MenuItem, Select, InputLabel, FormControl,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Save as SaveIcon
} from "@mui/icons-material";
import { queryTableData } from '../services/api';

const TableEditor = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [changedRows, setChangedRows] = useState(new Set());

    // Extract filter params from location state
    const filterParams = location.state?.filterParams || {
        sessionId: 'test-session-id', // This should come from your session management
        processId: 1, // Default values for testing
        layerIds: [1],
        operationIds: null,
        page: 1,
        pageSize: 10
    };

    useEffect(() => {
        loadTableData();
    }, [page, rowsPerPage]);

    const loadTableData = async () => {
        try {
            setLoading(true);
            const queryParams = {
                ...filterParams,
                page: page + 1, // API uses 1-based pagination
                pageSize: rowsPerPage
            };

            console.log('Querying table data with params:', queryParams);
            const response = await queryTableData(queryParams);
            console.log('Table data response:', response);

            setTableData(response.items || []);
            setTotalCount(response.totalCount || 0);
        } catch (error) {
            console.error('Error loading table data:', error);
            // Handle error state
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddRow = () => {
        setCurrentRow({
            processId: filterParams.processId,
            layerId: filterParams.layerIds[0],
            defectTypeId: 0,
            operationId: filterParams.operationIds ? filterParams.operationIds[0] : 0,
            classType: 'CLASS',
            entityConfidence: 3,
            comments: '',
            securityCode: 8,
        });
        setEditMode(false);
        setOpenDialog(true);
    };

    const handleEditRow = (row) => {
        setCurrentRow({ ...row });
        setEditMode(true);
        setOpenDialog(true);
    };

    const handleDeleteRow = (row) => {
        // For now, just log the deletion
        console.log('Delete row:', row);
        // In a real app, you would mark this row for deletion
        // and update your changed rows tracking
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentRow(null);
    };

    const handleSaveRow = () => {
        if (editMode) {
            // Update existing row
            const updatedData = tableData.map(row =>
                row.tableDataId === currentRow.tableDataId ? currentRow : row
            );
            setTableData(updatedData);

            // Mark as changed
            setChangedRows(prev => new Set(prev).add(currentRow.tableDataId));
        } else {
            // Add new row (in a real app, you'd assign a temporary ID)
            const newRow = {
                ...currentRow,
                tableDataId: -Date.now(), // Temporary negative ID to identify new rows
                lastModified: new Date().toISOString(),
                lastModifiedBy: 'Current User',
            };
            setTableData([...tableData, newRow]);

            // Mark as changed (new rows)
            setChangedRows(prev => new Set(prev).add(newRow.tableDataId));
        }

        handleCloseDialog();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentRow(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReviewChanges = () => {
        // Navigate to review page with current changes
        navigate('/review', { state: { changedRows: Array.from(changedRows) } });
    };

    const handleSaveDraft = () => {
        // In a real app, you would save the draft changes to the server
        console.log('Save draft');
    };

    const handleDiscardChanges = () => {
        // Confirm and reset changes
        if (window.confirm('Are you sure you want to discard all changes?')) {
            setChangedRows(new Set());
            loadTableData();
        }
    };

    // Determine if a row has been changed
    const isRowChanged = (rowId) => changedRows.has(rowId);

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Table Editor
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddRow}
                    >
                        Add Row
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSaveDraft}
                    >
                        Save Draft
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleReviewChanges}
                        disabled={changedRows.size === 0}
                    >
                        Review Changes
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDiscardChanges}
                        disabled={changedRows.size === 0}
                    >
                        Discard Changes
                    </Button>
                </Box>
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Layer ID</TableCell>
                                <TableCell>Defect Type</TableCell>
                                <TableCell>Operation ID</TableCell>
                                <TableCell>Class Type</TableCell>
                                <TableCell>Entity Confidence</TableCell>
                                <TableCell>Comments</TableCell>
                                <TableCell>Last Modified</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">Loading...</TableCell>
                                </TableRow>
                            ) : tableData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">No data found</TableCell>
                                </TableRow>
                            ) : (
                                tableData.map((row) => (
                                    <TableRow
                                        key={row.tableDataId}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            backgroundColor: isRowChanged(row.tableDataId) ? 'rgba(255, 235, 59, 0.1)' : 'inherit'
                                        }}
                                    >
                                        <TableCell>{row.layerId}</TableCell>
                                        <TableCell>{row.defectTypeId}</TableCell>
                                        <TableCell>{row.operationId}</TableCell>
                                        <TableCell>{row.classType}</TableCell>
                                        <TableCell>{row.entityConfidence}</TableCell>
                                        <TableCell>{row.comments}</TableCell>
                                        <TableCell>{new Date(row.lastModified).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEditRow(row)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteRow(row)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Edit/Add Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>{editMode ? 'Edit Row' : 'Add New Row'}</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, my: 2 }}>
                        <TextField
                            label="Layer ID"
                            name="layerId"
                            value={currentRow?.layerId || ''}
                            onChange={handleInputChange}
                            fullWidth
                            disabled={editMode} // Can't change key fields when editing
                        />
                        <TextField
                            label="Defect Type ID"
                            name="defectTypeId"
                            value={currentRow?.defectTypeId || ''}
                            onChange={handleInputChange}
                            fullWidth
                            disabled={editMode}
                        />
                        <TextField
                            label="Operation ID"
                            name="operationId"
                            value={currentRow?.operationId || ''}
                            onChange={handleInputChange}
                            fullWidth
                            disabled={editMode}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Class Type</InputLabel>
                            <Select
                                name="classType"
                                value={currentRow?.classType || ''}
                                onChange={handleInputChange}
                                label="Class Type"
                            >
                                <MenuItem value="CLASS">CLASS</MenuItem>
                                <MenuItem value="OTHER">OTHER</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Entity Confidence"
                            name="entityConfidence"
                            type="number"
                            value={currentRow?.entityConfidence || ''}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            label="Comments"
                            name="comments"
                            value={currentRow?.comments || ''}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rows={2}
                        />
                        <TextField
                            label="Security Code"
                            name="securityCode"
                            type="number"
                            value={currentRow?.securityCode || ''}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveRow} color="primary" variant="contained" startIcon={<SaveIcon />}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TableEditor;