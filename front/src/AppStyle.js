import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#3148e3',
      
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

class App extends React.Component {
    render() {
        
        return (
              <ThemeProvider theme={theme}>
                <Button color="primary" variant="contained">Primary</Button>
                <Button color="secondary">Secondary</Button>
              </ThemeProvider>
            );
        }


}

export default App;