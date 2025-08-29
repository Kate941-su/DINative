import { SampleRepositoryImpl } from "@/domains/repository/sampleRepositoryImpl";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DependencyInjection, TestRepository } from "./DependencyInjection";

interface TestUIProps {
  title?: string;
  onPress?: () => void;
}

export const TestUI: React.FC<TestUIProps> = ({
  title = "Test UI Component",
  onPress,
}) => {
  const TestDI = new DependencyInjection<TestRepository>({
    name: "1",
    sampleRepository: new SampleRepositoryImpl(),
  });
  TestDI.overrideContainer({
    name: "2",
    sampleRepository: new SampleRepositoryImpl(),
  });
  return (
    <TestDI.Provider>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.content}>
          <Text style={styles.description}>
            This is a placeholder UI component for testing purposes.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Test Button</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TestDI.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  content: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TestUI;
