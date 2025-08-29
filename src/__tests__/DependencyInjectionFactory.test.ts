import React, { createContext } from 'react';
import { DependencyInjectionFactory } from '../DependencyInjectionFactory';

describe('DependencyInjectionFactory', () => {
  beforeEach(() => {
    DependencyInjectionFactory.clearAll();
  });

  it('should be able to create React contexts', () => {
    const context = createContext('test');
    expect(context).toBeDefined();
  });

  describe('setInstance', () => {
    it('should set an instance for a given ID', () => {
      const mockContext = React.createContext('test');
      DependencyInjectionFactory.setInstance('testId', mockContext);

      const result = DependencyInjectionFactory.getInstance('testId');
      expect(result).toBe(mockContext);
    });

    it('should overwrite existing instance', () => {
      const mockContext1 = React.createContext('test1');
      const mockContext2 = React.createContext('test2');

      DependencyInjectionFactory.setInstance('testId', mockContext1);
      DependencyInjectionFactory.setInstance('testId', mockContext2);

      const result = DependencyInjectionFactory.getInstance('testId');
      expect(result).toBe(mockContext2);
    });
  });

  describe('getInstance', () => {
    it('should return undefined for non-existent ID', () => {
      const result = DependencyInjectionFactory.getInstance('nonExistent');
      expect(result).toBeUndefined();
    });

    it('should return the correct instance for existing ID', () => {
      const mockContext = React.createContext('test');
      DependencyInjectionFactory.setInstance('testId', mockContext);

      const result = DependencyInjectionFactory.getInstance('testId');
      expect(result).toBe(mockContext);
    });
  });

  describe('createContext', () => {
    it('should create a new context if it does not exist', () => {
      const defaultValue = { name: 'test' };
      const context = DependencyInjectionFactory.createContext(
        'testId2',
        defaultValue
      );

      expect(context).toBeDefined();
      expect(DependencyInjectionFactory.getInstance('testId2')).toBe(context);
    });

    it('should return existing context if it already exists', () => {
      const defaultValue = { name: 'test' };
      const context1 = DependencyInjectionFactory.createContext(
        'testId3',
        defaultValue
      );
      const context2 = DependencyInjectionFactory.createContext(
        'testId3',
        defaultValue
      );

      expect(context1).toBe(context2);
    });
  });

  describe('removeInstance', () => {
    it('should remove an instance and return true', () => {
      const mockContext = React.createContext('test');
      DependencyInjectionFactory.setInstance('testId', mockContext);

      const result = DependencyInjectionFactory.removeInstance('testId');
      expect(result).toBe(true);
      expect(DependencyInjectionFactory.getInstance('testId')).toBeUndefined();
    });

    it('should return false for non-existent ID', () => {
      const result = DependencyInjectionFactory.removeInstance('nonExistent');
      expect(result).toBe(false);
    });
  });

  describe('clearAll', () => {
    it('should clear all registered instances', () => {
      const mockContext1 = React.createContext('test1');
      const mockContext2 = React.createContext('test2');

      DependencyInjectionFactory.setInstance('testId1', mockContext1);
      DependencyInjectionFactory.setInstance('testId2', mockContext2);

      DependencyInjectionFactory.clearAll();

      expect(DependencyInjectionFactory.getInstance('testId1')).toBeUndefined();
      expect(DependencyInjectionFactory.getInstance('testId2')).toBeUndefined();
    });
  });

  describe('getRegisteredIds', () => {
    it('should return empty array when no instances are registered', () => {
      const ids = DependencyInjectionFactory.getRegisteredIds();
      expect(ids).toEqual([]);
    });

    it('should return all registered IDs', () => {
      const mockContext1 = React.createContext('test1');
      const mockContext2 = React.createContext('test2');

      DependencyInjectionFactory.setInstance('testId1', mockContext1);
      DependencyInjectionFactory.setInstance('testId2', mockContext2);

      const ids = DependencyInjectionFactory.getRegisteredIds();
      expect(ids).toContain('testId1');
      expect(ids).toContain('testId2');
      expect(ids).toHaveLength(2);
    });
  });
});
