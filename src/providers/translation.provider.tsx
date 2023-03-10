import { createContext, useState } from "react";

import { flattenObject } from '@app/helpers';
import { Locale } from "@app/types";
import { Dictionary } from "@app/shared/types";

import en from '@assets/translations/en.json';
import fr from '@assets/translations/fr.json';

/**
 * Gets the available translations.
 */
const Translations = {
  en,
  fr
};

/**
 * Gets the default application locale.
 */
const DefaultLocale: Locale = 'en';

/**
 * Gets the translations for the given locale.
 * @param locale Locale
 * @returns Translations object for the given locale.
 */
const getLocaleTranslations = (locale: string): object => Translations[locale as keyof typeof Translations];

/**
 * Checks if the given locale has translations available.
 * @param locale Locale.
 * @returns True if the translation object is found; false otherwise.
 */
const hasLocale = (locale: string): boolean => getLocaleTranslations(locale) !== null;

/**
 * Gets the translations dictionary for the given locale.
 * @param locale Locale.
 * @returns Translation dictionary for the given locale.
 */
const getTranslationDictionary = (locale: string): Dictionary<string> => {
  const translationResources = getLocaleTranslations(locale);

  if (!translationResources) {
    throw new Error(`Failed to load translation resources for locale '${locale}'.`);
  }

  return flattenObject(translationResources) as Dictionary<string>;
};

type Context = {
  locale: Locale,
  setLocale: (newLocale: Locale) => void,
  translations: Dictionary<string>,
  setTranslations: (translations: Dictionary<string>) => void
};

type Props = {
  children: React.ReactElement | React.ReactElement[]
};

const TranslationContext = createContext({
  locale: DefaultLocale,
  setLocale: () => void 0,
  translations: {},
  setTranslations: () => void 0,
} as Context);

const TranslationProvider: React.FunctionComponent<Props> = (props: Props) => {
  const [locale, setLocale] = useState<Locale>(DefaultLocale);
  const [translations, setTranslations] = useState(getTranslationDictionary(DefaultLocale));

  const loadTranslations = (locale: string): void => {
    setTranslations(getTranslationDictionary(locale));
  };

  const handleSetLocale = (newLocale: Locale): void => {
    if (hasLocale(newLocale)) {
      setLocale(newLocale);
      loadTranslations(newLocale);
    }
  };

  return (
    <TranslationContext.Provider value={{
      locale,
      setLocale: handleSetLocale,
      translations
    } as Context}>
      {props.children}
    </TranslationContext.Provider>
  );
};

export { TranslationContext, TranslationProvider };
