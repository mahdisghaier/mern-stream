// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { Provider } from 'react-redux';
import {store} from './data';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <Provider store={store}>
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
    </Provider>
  );
}
