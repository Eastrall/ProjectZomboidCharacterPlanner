import { useContext } from "react";

import { Languages, Locale, UseLocale } from "./model";
import { ALLOWED_LOCALES } from "./constants";
import { TranslationContext } from "./TranslationContext";
import translations from "./index";

const useLocale = (): UseLocale => {
	const { locale, setLocale } = useContext(TranslationContext);

	const translate = (key: string): string => {
		const translationKey = (translations as Languages)?.[locale]?.[key];

		if (!translationKey) {
			console.warn(`Translation key "${key}" not found for locale "${locale}"`);
			return key;
		}

		return translationKey;
	};

	const handleSetLocale = (newLocale: Locale): void => {
		if (!ALLOWED_LOCALES.includes(newLocale)) {
			console.error(`Locale "${newLocale}" do not exist`);
		} else {
			setLocale(newLocale);
		}
	};

	return { locale, setLocale: handleSetLocale, translate };
};

export default useLocale;
