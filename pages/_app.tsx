import '@styles/global.scss'
import { ThemeProvider } from 'theme-ui';
import theme from '../config/theme'

const App = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
)

export default App