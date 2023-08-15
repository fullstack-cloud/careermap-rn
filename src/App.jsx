import React, {Suspense} from 'react';
import AuthContextProvider from './Context/auth-context';
import Navigator from './Navigation/Navigator';

function App() {
  return (
    <Suspense>
      <AuthContextProvider>
        <Navigator />
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;