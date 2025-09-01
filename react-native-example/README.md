# React Native DI Example

This is an example React Native application that demonstrates how to use the `react-dependency-injection` library in a real React Native project.

## Features

- **User Service**: Manages user data with async operations
- **Auth Service**: Handles authentication state and operations
- **Dependency Injection**: Services are injected using the DI library
- **Real-time Updates**: UI updates based on service state changes
- **Error Handling**: Proper error handling with user feedback

## Project Structure

```
react-native-example/
├── App.tsx                 # Main app component with DI setup
├── __tests__/
│   └── App.test.tsx       # Tests for the app
├── package.json           # Dependencies and scripts
├── jest.config.js         # Jest configuration
└── jest.setup.js          # Jest setup file
```

## Services

### UserService
- `getCurrentUser()`: Fetches current user data
- `updateUser(user)`: Updates user information

### AuthService
- `isAuthenticated()`: Checks authentication status
- `login(email, password)`: Performs login
- `logout()`: Performs logout

## How to Run

### Prerequisites
- Node.js 16+
- React Native CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Installation

1. Install dependencies:
```bash
cd react-native-example
npm install
```

2. Link the local library:
```bash
npm link ../dist
```

3. Run the app:

For iOS:
```bash
npm run ios
```

For Android:
```bash
npm run android
```

### Testing

Run the tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## Key Implementation Details

### 1. Service Registration
Services are registered using `DependencyInjectionFactory.createContext()`:

```typescript
DependencyInjectionFactory.createContext<UserService>('userService', new UserServiceImpl());
DependencyInjectionFactory.createContext<AuthService>('authService', new AuthServiceImpl());
```

### 2. Service Injection
Services are injected into components using the `useDependencyInjection` hook:

```typescript
const userService = useDependencyInjection<UserService>('userService');
const authService = useDependencyInjection<AuthService>('authService');
```

### 3. Provider Setup
The app is wrapped with providers to make services available:

```typescript
<DependencyInjectionFactory.Provider id="userService" instance={new UserServiceImpl()}>
  <DependencyInjectionFactory.Provider id="authService" instance={new AuthServiceImpl()}>
    {/* App content */}
  </DependencyInjectionFactory.Provider>
</DependencyInjectionFactory.Provider>
```

## Testing Strategy

The example includes comprehensive tests that demonstrate:

1. **Component Rendering**: Tests that components render correctly
2. **Service Integration**: Tests that services work as expected
3. **User Interactions**: Tests for button presses and state changes
4. **Async Operations**: Tests for loading states and async service calls
5. **Error Handling**: Tests for error scenarios

## Benefits of Using DI in React Native

1. **Testability**: Easy to mock services for testing
2. **Maintainability**: Clear separation of concerns
3. **Flexibility**: Easy to swap implementations
4. **Type Safety**: Full TypeScript support
5. **Performance**: Services are shared across components

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **iOS build issues**: Clean build folder in Xcode
3. **Android build issues**: Clean project with `cd android && ./gradlew clean`

### Getting Help

If you encounter issues:
1. Check the main library README
2. Review the test files for usage examples
3. Open an issue on the GitHub repository

