import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { TextInput } from "react-native";

interface InputTextContextType {
  inputText: string;
  setInputText: (text: string) => void;
  selectText: (start: number, end: number) => void; // NOTE: This is not working.
  inputRef: React.RefObject<TextInput>;
}

const InputTextContext = createContext<InputTextContextType | undefined>(
  undefined
);

export const useInputText = () => {
  const context = useContext(InputTextContext);
  if (context === undefined) {
    throw new Error("useInputText must be used within an InputTextProvider");
  }
  return context;
};

export const InputTextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<TextInput>(null);

  const selectText = (start: number, end: number) => {
    if (inputRef.current) {
      console.log("select text", start, end);
      inputRef.current.setNativeProps({
        selection: { start, end },
      });
    }
  };

  return (
    <InputTextContext.Provider
      value={{ inputText, setInputText, selectText, inputRef }}
    >
      {children}
    </InputTextContext.Provider>
  );
};
