# React Dependency Injection

A lightweight, type-safe dependency injection library for React applications with TypeScript support.

## Features

- 🚀 **Lightweight**: Minimal bundle size with zero external dependencies
- 🔒 **Type-safe**: Full TypeScript support with strict typing
- ⚡ **Simple API**: Easy to use with React hooks and context
- 🎯 **Flexible**: Support for multiple dependency containers
- 🔧 **Developer friendly**: Comprehensive error messages and debugging

## Installation

```bash
npm install react-dependency-injection
```

or

```bash
yarn add react-dependency-injection
```

## Quick Start

### 1. Define your dependencies

```typescript
// services/UserService.ts
export interface UserService {
  getUser(id: string): Promise<User>;
  createUser(user: User): Promise<User>;
}

export class UserServiceImpl implements UserService {
  async getUser(id: string): Promise<User> {
    // Implementation
  }
  
  async createUser(user: User): Promise<User> {
    // Implementation
  }
}
```

### 2. Register your dependencies

```typescript
// App.tsx
import React from 'react';
import { DependencyInjectionFactory } from 'react-dependency-injection';
import { UserService, UserServiceImpl } from './services/UserService';

// Create and register the context
const userServiceContext = DependencyInjectionFactory.createContext<UserService>(
  'userService',
  new UserServiceImpl()
);

function App() {
  return (
    <DependencyInjectionFactory.Provider
      id="userService"
      instance={new UserServiceImpl()}
    >
      <UserProfile />
    </DependencyInjectionFactory.Provider>
  );
}
```

### 3. Use dependencies in components

```typescript
// components/UserProfile.tsx
import React from 'react';
import { useDependencyInjection } from 'react-dependency-injection';
import { UserService } from '../services/UserService';

export const UserProfile: React.FC = () => {
  const userService = useDependencyInjection<UserService>('userService');
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    userService.getUser('123').then(setUser);
  }, [userService]);

  return (
    <div>
      {user && <h1>Welcome, {user.name}!</h1>}
    </div>
  );
};
```

## API Reference

### DependencyInjectionFactory

The main factory class for managing dependency injection containers.

#### Methods

##### `createContext<T>(id: string, defaultValue: T): React.Context<T>`

Creates a React context for a given ID if it doesn't exist.

```typescript
const context = DependencyInjectionFactory.createContext('myService', new MyService());
```

##### `setInstance<T>(id: string, instance: React.Context<T>): void`

Sets an instance for a given ID.

```typescript
const context = React.createContext(new MyService());
DependencyInjectionFactory.setInstance('myService', context);
```

##### `getInstance<T>(id: string): React.Context<T> | undefined`

Gets an instance by ID.

```typescript
const context = DependencyInjectionFactory.getInstance<MyService>('myService');
```

##### `removeInstance(id: string): boolean`

Removes an instance by ID.

```typescript
const removed = DependencyInjectionFactory.removeInstance('myService');
```

##### `clearAll(): void`

Clears all registered instances.

```typescript
DependencyInjectionFactory.clearAll();
```

##### `getRegisteredIds(): string[]`

Gets all registered instance IDs.

```typescript
const ids = DependencyInjectionFactory.getRegisteredIds();
```

#### Provider Component

```typescript
<DependencyInjectionFactory.Provider
  id="myService"
  instance={new MyService()}
>
  <YourComponent />
</DependencyInjectionFactory.Provider>
```

### Hooks

#### `useDependencyInjection<T>(id: string): T`

Hook to access a dependency from the container.

```typescript
const service = useDependencyInjection<MyService>('myService');
```

#### `useDependencyInjectionSafe<T>(id: string, fallback: T): T`

Hook to safely access a dependency with a fallback value.

```typescript
const service = useDependencyInjectionSafe<MyService>('myService', new DefaultService());
```

## Advanced Usage

### Multiple Dependencies

```typescript
// Register multiple services
const userService = DependencyInjectionFactory.createContext('userService', new UserService());
const authService = DependencyInjectionFactory.createContext('authService', new AuthService());

function App() {
  return (
    <DependencyInjectionFactory.Provider id="userService" instance={new UserService()}>
      <DependencyInjectionFactory.Provider id="authService" instance={new AuthService()}>
        <YourApp />
      </DependencyInjectionFactory.Provider>
    </DependencyInjectionFactory.Provider>
  );
}
```

### Testing

```typescript
// Test setup
import { DependencyInjectionFactory } from 'react-dependency-injection';

beforeEach(() => {
  DependencyInjectionFactory.clearAll();
});

// In your test
test('should use mock service', () => {
  const mockService = { getUser: jest.fn() };
  DependencyInjectionFactory.setInstance('userService', React.createContext(mockService));
  
  // Your test logic
});
```

### Error Handling

```typescript
import { useDependencyInjectionSafe } from 'react-dependency-injection';

function MyComponent() {
  const service = useDependencyInjectionSafe('userService', new DefaultService());
  
  // service will be DefaultService if userService is not found
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue on GitHub.
