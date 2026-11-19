import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { HomeStayProvider } from './context/HomeStayContext.tsx'


const theme = createTheme({
    typography: {
        fontFamily: '"Be Vietnam Pro", sans-serif',
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <AuthProvider>
                    <HomeStayProvider>
                        <App />
                    </HomeStayProvider>
                </AuthProvider>
            </BrowserRouter>

        </ThemeProvider>
    </StrictMode>,
)
