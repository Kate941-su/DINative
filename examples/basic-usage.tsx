import React from 'react';
import { DependencyInjectionFactory, useDependencyInjection } from '../src';

// Define your service interface
interface UserService {
  getUser(id: string): Promise<{ id: string; name: string }>;
  createUser(user: { name: string }): Promise<{ id: string; name: string }>;
}

// Implement your service
class UserServiceImpl implements UserService {
  async getUser(id: string) {
    // Simulate API call
    return { id, name: `User ${id}` };
  }

  async createUser(user: { name: string }) {
    // Simulate API call
    return { id: Math.random().toString(), name: user.name };
  }
}

// Create and register the context
const userServiceContext = DependencyInjectionFactory.createContext<UserService>(
  'userService',
  new UserServiceImpl()
);

// Component that uses the service
const UserProfile: React.FC = () => {
  const userService = useDependencyInjection<UserService>('userService');
  const [user, setUser] = React.useState<{ id: string; name: string } | null>(null);

  React.useEffect(() => {
    userService.getUser('123').then(setUser);
  }, [userService]);

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.name}!</h1>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
};

// App component that provides the service
const App: React.FC = () => {
  return (
    <DependencyInjectionFactory.Provider
      id="userService"
      instance={new UserServiceImpl()}
    >
      <UserProfile />
    </DependencyInjectionFactory.Provider>
  );
};

export default App;
