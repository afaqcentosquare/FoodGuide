import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AllScreenRoutes} from './src/routes/all_routes/AllScreenRoutes';
import {AppColorScheme, AppThemeProvider} from './src/hooks/theme';
import { useColorScheme } from "react-native";
import {Provider} from 'react-redux';
import {store} from './src/redux/stores/store';

const App = () =>
{
  const scheme = useColorScheme();

  return(
    <Provider store={store}>
      <AppThemeProvider colorScheme={scheme === 'light' ? AppColorScheme.LIGHT : AppColorScheme.DARK}>
        <NavigationContainer>
          <AllScreenRoutes/>
        </NavigationContainer>
      </AppThemeProvider>
    </Provider>
  );
};

export default App;
