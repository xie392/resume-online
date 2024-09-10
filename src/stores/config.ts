import { Align, AvatarType } from "@/lib/constants";
import { createPersistStore } from "@/lib/store";

interface ConfigState {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  letterSpacing: number;
  align: Align;
  avatar: AvatarType;
  padding: number;
  themeColor: string;
  rowGap: number;
}

const initialState: ConfigState = {
  fontSize: 12,
  fontFamily: "思源宋体-medium",
  lineHeight: 1.7,
  letterSpacing: 0,
  align: Align.Left,
  avatar: AvatarType.Circle,
  padding: 30,
  themeColor: "#0070c9",
  rowGap: 20,
};

export const useConfigStore = createPersistStore(
  initialState,
  (set, get) => ({}),
  {
    name: "store-config",
    version: 1,
    // migrate(state, version) {
    // return newState as any
    // }
  }
);
