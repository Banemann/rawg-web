import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ChakraProvider } from '@chakra-ui/react'
import Theme from './theme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={Theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
