import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useTheme } from "../hooks/useTheme";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, style, ...props }: ButtonProps) {
  // Langsung implementasikan warnanya dengan memanggil useTheme
  const { colors, spacing } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.primary,
          paddingVertical: spacing.m,
          paddingHorizontal: spacing.l,
        },
        style,
      ]}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={[styles.text, { color: colors.background }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
