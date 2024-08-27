import { createPersistStore } from "@/lib/store";

interface DesignerState {
  /**
   * @description 缩放比例
   * @default 1
   */
  scale: number;
}

const initialState: DesignerState = {
  scale: 1,
};

export const useDesignerStore = createPersistStore(
  initialState,
  (set, get) => ({}),
  {
    name: "store-designer",
    version: 1,
    // migrate(state, version) {
    // return newState as any
    // }
  }
);
