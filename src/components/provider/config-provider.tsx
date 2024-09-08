"use client";
import {
  ConfigContexData,
  ConfigContext,
  ConfigContextState,
  configState,
} from "@/context/config-context";
import { useCallback, useState } from "react";

interface ConfigProviderProps {
  children: React.ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<ConfigContextState>(configState);

  const update: ConfigContexData["update"] = useCallback(
    (info) => {
      setConfig((prev) => ({ ...prev, ...info }));
    },
    [setConfig]
  );

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        update,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
