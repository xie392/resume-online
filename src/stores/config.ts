import { createPersistStore } from "@/lib/store";

interface ConfigState {
  /**
   * @description
   */
}

const initialState: ConfigState = {
  scale: 1,
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
