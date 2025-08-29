import React, { createContext } from 'react';
import type { DependencyInjectionProviderProps } from './types';

export class DependencyInjectionFactory {
  private static _instances: Map<string, React.Context<any>> = new Map();

  /**
   * Set an instance for a given ID
   * @param id - Unique identifier for the dependency
   * @param instance - React Context instance
   */
  static setInstance<T>(id: string, instance: React.Context<T>): void {
    if (this._instances.has(id)) {
      console.warn(
        `Instance with id ${id} already exists and will be overwritten`
      );
    }
    this._instances.set(id, instance);
  }

  /**
   * Get an instance by ID
   * @param id - Unique identifier for the dependency
   * @returns React Context instance or undefined if not found
   */
  static getInstance<T>(id: string): React.Context<T> | undefined {
    return this._instances.get(id) as React.Context<T> | undefined;
  }

  /**
   * Create a context for a given ID if it doesn't exist
   * @param id - Unique identifier for the dependency
   * @param defaultValue - Default value for the context
   * @returns React Context instance
   */
  static createContext<T>(id: string, defaultValue: T): React.Context<T> {
    let context = this.getInstance<T>(id);
    if (!context) {
      context = createContext<T>(defaultValue);
      this.setInstance(id, context);
    }
    return context;
  }

  /**
   * Remove an instance by ID
   * @param id - Unique identifier for the dependency
   */
  static removeInstance(id: string): boolean {
    return this._instances.delete(id);
  }

  /**
   * Clear all instances
   */
  static clearAll(): void {
    this._instances.clear();
  }

  /**
   * Get all registered instance IDs
   * @returns Array of registered instance IDs
   */
  static getRegisteredIds(): string[] {
    return Array.from(this._instances.keys());
  }

  /**
   * Provider component for dependency injection
   */
  static Provider: React.FC<DependencyInjectionProviderProps> = ({
    children,
    id,
    instance,
  }) => {
    const context = this.getInstance(id);
    if (!context) {
      console.error(
        `Context with id ${id} not found. Make sure to register it first.`
      );
      return React.createElement(React.Fragment, {}, children);
    }
    return React.createElement(context.Provider, { value: instance }, children);
  };
}
