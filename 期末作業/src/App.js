/* eslint-disable */
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { prodaction } from './prodaction';
import { Provider } from './Context';

const App = () => {
  const routing = useRoutes(routes);
  const data = prodaction();
  return (
    <Provider value={data}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
    </Provider>
  );
};

export default App;
