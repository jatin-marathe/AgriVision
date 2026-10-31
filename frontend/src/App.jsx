import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';

const App = () => (
    <ThemeProvider>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </ThemeProvider>
);

export default App;
