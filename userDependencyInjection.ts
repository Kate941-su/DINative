import React, { useContext } from "react";
import { DependencyInjectionFactory } from "./DependencyInjection";

export const useDependencyInjection = <T>(id: string) => {
  const instance = DependencyInjectionFactory.getInstance(id);
  const context = instance as React.Context<T> | undefined;
  if (!context) {
    throw new Error("DI context not found");
  }
  return useContext(context);
};
