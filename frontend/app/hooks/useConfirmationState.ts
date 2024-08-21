import { useCallback, useState } from "react";
import { Language } from "../models/Language";

export default function useConfirmationState(
  confirmations: Map<Language, string> | undefined
) {
  const [selectedConfirmationLang, setSelectedConfirmationLang] =
    useState<Language | null>(null);
  const [isConfirmPressed, setIsConfirmPressed] = useState(false);

  const handleConfirmPress = useCallback(() => {
    setIsConfirmPressed(true);
    const firstLang = Array.from(confirmations || [])[0]?.[0] || null;
    setSelectedConfirmationLang(firstLang);
  }, [confirmations]);

  const handleConfirmRelease = useCallback(() => {
    setIsConfirmPressed(false);
  }, []);

  const handleScroll = useCallback(
    (position: number) => {
      const itemWidth = 60;
      const languages = Array.from(confirmations || []);
      const selectedIndex = Math.floor(position / itemWidth);
      if (selectedIndex >= 0 && selectedIndex < languages.length) {
        setSelectedConfirmationLang(languages[selectedIndex][0]);
      }
    },
    [confirmations]
  );

  return {
    selectedConfirmationLang,
    isConfirmPressed,
    handleConfirmPress,
    handleConfirmRelease,
    handleScroll,
  };
}
