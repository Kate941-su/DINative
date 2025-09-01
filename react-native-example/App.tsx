import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  DependencyInjectionFactory,
  useDependencyInjection,
} from 'react-dependency-injection';

// Define service interfaces
interface UserService {
  getCurrentUser(): Promise<{ id: string; name: string; email: string }>;
  updateUser(user: { id: string; name: string; email: string }): Promise<void>;
}

interface AuthService {
  isAuthenticated(): boolean;
  login(email: string, password: string): Promise<boolean>;
  logout(): Promise<void>;
}

// Implement services
class UserServiceImpl implements UserService {
  private currentUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  };

  async getCurrentUser() {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.currentUser;
  }

  async updateUser(user: { id: string; name: string; email: string }) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    this.currentUser = user;
  }
}

class AuthServiceImpl implements AuthService {
  private authenticated = true;

  isAuthenticated() {
    return this.authenticated;
  }

  async login(email: string, password: string) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.authenticated = true;
    return true;
  }

  async logout() {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    this.authenticated = false;
  }
}

// Create contexts
DependencyInjectionFactory.createContext<UserService>(
  'userService',
  new UserServiceImpl()
);
DependencyInjectionFactory.createContext<AuthService>(
  'authService',
  new AuthServiceImpl()
);

// Component that uses UserService
const UserProfile: React.FC = () => {
  const userService = useDependencyInjection<UserService>('userService');
  const [user, setUser] = React.useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await userService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async () => {
    if (!user) return;

    try {
      await userService.updateUser({
        ...user,
        name: 'Jane Doe',
      });
      await loadUser();
      Alert.alert('Success', 'User updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update user');
    }
  };

  if (loading) {
    return (
      <View style={styles.card}>
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>User Profile</Text>
      {user && (
        <>
          <Text style={styles.userInfo}>Name: {user.name}</Text>
          <Text style={styles.userInfo}>Email: {user.email}</Text>
          <TouchableOpacity style={styles.button} onPress={updateUser}>
            <Text style={styles.buttonText}>Update User</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

// Component that uses AuthService
const AuthStatus: React.FC = () => {
  const authService = useDependencyInjection<AuthService>('authService');
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    authService.isAuthenticated()
  );

  const handleLogin = async () => {
    try {
      const success = await authService.login('test@example.com', 'password');
      if (success) {
        setIsAuthenticated(true);
        Alert.alert('Success', 'Logged in successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      Alert.alert('Success', 'Logged out successfully');
    } catch (error) {
      Alert.alert('Error', 'Logout failed');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Authentication Status</Text>
      <Text style={styles.authStatus}>
        Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </Text>
      {isAuthenticated ? (
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <DependencyInjectionFactory.Provider
      id="userService"
      instance={new UserServiceImpl()}
    >
      <DependencyInjectionFactory.Provider
        id="authService"
        instance={new AuthServiceImpl()}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View style={styles.header}>
              <Text style={styles.title}>React Native DI Example</Text>
              <Text style={styles.subtitle}>
                Using react-dependency-injection library
              </Text>
            </View>

            <UserProfile />
            <AuthStatus />

            <View style={styles.card}>
              <Text style={styles.cardTitle}>About</Text>
              <Text style={styles.description}>
                This example demonstrates how to use the
                react-dependency-injection library in a React Native
                application. The app shows two services (UserService and
                AuthService) being injected and used in different components.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </DependencyInjectionFactory.Provider>
    </DependencyInjectionFactory.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  card: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  authStatus: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButton: {
    backgroundColor: '#34C759',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
});

export default App;

