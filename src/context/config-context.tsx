"use client";
import { Align, AvatarType } from "@/lib/constants";
import { createContext } from "react";

export interface ConfigContextState {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  letterSpacing: number;
  align: Align;
  avatar: AvatarType;
  padding: number;
  themeColor: string;
}

export interface ConfigContexData extends ConfigContextState {
  update: (info: Partial<ConfigContextState>) => void;
}

export const configState = {
  fontSize: 12,
  fontFamily: "宋体",
  lineHeight: 1.5,
  letterSpacing: 0,
  align: Align.Left,
  avatar: AvatarType.Circle,
  padding: 10,
  themeColor: "#0070c9",
};

export const configReducer = {
  update: () => {},
};

export const ConfigContext = createContext<ConfigContexData>({
  ...configState,
  ...configReducer,
});
