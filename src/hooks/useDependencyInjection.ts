import React, { useContext } from 'react';
import { DependencyInjectionFactory } from '../DependencyInjectionFactory';

/**
 * Hook to access a dependency from the dependency injection container
 * @param id - Unique identifier for the dependency
 * @returns The dependency instance
 * @throws Error if the dependency is not found
 */
export const useDependencyInjection = <T>(id: string): T => {
  const instance = DependencyInjectionFactory.getInstance<T>(id);
  
  if (!instance) {
    throw new Error(
      `Dependency with id "${id}" not found. Make sure to register it using DependencyInjectionFactory.setInstance() or DependencyInjectionFactory.createContext()`
    );
  }
  
  const context = useContext(instance);
  
  if (context === undefined) {
    throw new Error(
      `Dependency with id "${id}" is not provided in the component tree. Make sure to wrap your component with DependencyInjectionFactory.Provider`
    );
  }
  
  return context;
};

/**
 * Hook to safely access a dependency with a fallback value
 * @param id - Unique identifier for the dependency
 * @param fallback - Fallback value if dependency is not found
 * @returns The dependency instance or fallback value
 */
export const useDependencyInjectionSafe = <T>(id: string, fallback: T): T => {
  try {
    return useDependencyInjection<T>(id);
  } catch {
    return fallback;
  }
};
