import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';
import { DependencyInjectionFactory } from 'react-dependency-injection';

// Mock React Native components
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Alert: {
      alert: jest.fn(),
    },
  };
});

describe('React Native DI Example App', () => {
  beforeEach(() => {
    // Clear all registered instances before each test
    DependencyInjectionFactory.clearAll();
  });

  it('renders the app title correctly', () => {
    const { getByText } = render(<App />);

    expect(getByText('React Native DI Example')).toBeTruthy();
    expect(getByText('Using react-dependency-injection library')).toBeTruthy();
  });

  it('shows user profile with loading state initially', () => {
    const { getByText } = render(<App />);

    expect(getByText('Loading user data...')).toBeTruthy();
  });

  it('displays user information after loading', async () => {
    const { getByText } = render(<App />);

    // Wait for the user data to load
    await waitFor(() => {
      expect(getByText('Name: John Doe')).toBeTruthy();
      expect(getByText('Email: john@example.com')).toBeTruthy();
    });
  });

  it('shows authentication status', () => {
    const { getByText } = render(<App />);

    expect(getByText('Status: Authenticated')).toBeTruthy();
  });

  it('handles user update', async () => {
    const { getByText } = render(<App />);

    // Wait for user data to load
    await waitFor(() => {
      expect(getByText('Name: John Doe')).toBeTruthy();
    });

    // Press update button
    const updateButton = getByText('Update User');
    fireEvent.press(updateButton);

    // Wait for the update to complete
    await waitFor(() => {
      expect(getByText('Name: Jane Doe')).toBeTruthy();
    });
  });

  it('handles logout', async () => {
    const { getByText } = render(<App />);

    // Press logout button
    const logoutButton = getByText('Logout');
    fireEvent.press(logoutButton);

    // Wait for logout to complete
    await waitFor(() => {
      expect(getByText('Status: Not Authenticated')).toBeTruthy();
    });
  });

  it('handles login', async () => {
    const { getByText } = render(<App />);

    // First logout
    const logoutButton = getByText('Logout');
    fireEvent.press(logoutButton);

    await waitFor(() => {
      expect(getByText('Status: Not Authenticated')).toBeTruthy();
    });

    // Then login
    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('Status: Authenticated')).toBeTruthy();
    });
  });

  it('shows about section', () => {
    const { getByText } = render(<App />);

    expect(getByText('About')).toBeTruthy();
    expect(getByText(/This example demonstrates/)).toBeTruthy();
  });
});

