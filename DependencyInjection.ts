import React from "react";

export class DependencyInjectionFactory {
  private static _instances: Map<string, React.Context<any>> = new Map();

  static setInstance<T>(id: string, instance: React.Context<T>) {
    if (this._instances.has(id)) {
      console.log(`Instance with id ${id} already exists`);
      return;
    }
    this._instances.set(id, instance);
  }

  static getInstance<T>(id: string): React.Context<T> | undefined {
    if (!this._instances.has(id)) {
      return undefined;
    }
    return this._instances.get(id) as React.Context<T>;
  }

  static Provider: React.FC<{
    children: React.ReactNode;
    id: string;
    instance: any;
  }> = ({ children, id, instance }) => {
    const context = this.getInstance(id);
    if (!context) {
      console.error(`Context with id ${id} not found`);
      return React.createElement(React.Fragment, {}, children);
    }
    return React.createElement(context.Provider, { value: instance }, children);
  };
}