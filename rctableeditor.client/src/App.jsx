import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import Layout from './components/Layout';
import { SessionProvider } from './context/SessionContext';

// Import pages
import Dashboard from './pages/Dashboard';
import FilterSelection from './pages/FilterSelection';
import TableEditor from './pages/TableEditor';
import ReviewChanges from './pages/ReviewChanges';
import SubmitChanges from './pages/SubmitChanges';
import ChangeHistory from './pages/ChangeHistory';
import ImportSession from './pages/ImportSession';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SessionProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout><Dashboard /></Layout>} />
                        <Route path="/filters" element={<Layout><FilterSelection /></Layout>} />
                        <Route path="/table-editor" element={<Layout><TableEditor /></Layout>} />
                        <Route path="/review" element={<Layout><ReviewChanges /></Layout>} />
                        <Route path="/submit" element={<Layout><SubmitChanges /></Layout>} />
                        <Route path="/history" element={<Layout><ChangeHistory /></Layout>} />
                        <Route path="/import" element={<Layout><ImportSession /></Layout>} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Router>
            </SessionProvider>
        </ThemeProvider>
    );
}

export default App;