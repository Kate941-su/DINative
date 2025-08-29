import React from 'react';

/**
 * Props for the DependencyInjectionFactory.Provider component
 */
export interface DependencyInjectionProviderProps {
  /** Unique identifier for the dependency */
  id: string;
  /** The dependency instance to provide */
  instance: any;
  /** React children */
  children: React.ReactNode;
}

/**
 * Configuration for creating a dependency injection container
 */
export interface DependencyInjectionConfig<T> {
  /** Unique identifier for the dependency */
  id: string;
  /** The dependency instance */
  instance: T;
}

/**
 * Result of dependency injection operations
 */
export interface DependencyInjectionResult<T> {
  /** Whether the operation was successful */
  success: boolean;
  /** Error message if operation failed */
  error?: string;
  /** The dependency instance if successful */
  instance?: T;
}
