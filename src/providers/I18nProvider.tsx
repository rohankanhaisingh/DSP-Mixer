import { createContext, useMemo, useState, type ReactNode } from "react";

export type Translations = Record<string, any>;

export interface I18nContextValue {
    locale: string;
    dictionaries: Record<string, Translations>;
    setLocale: (locale: string) => void;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export interface I18nProviderProperties {
    initialLocale: string;
    dictionaries: Record<string, Translations>;
    children: ReactNode;
}

export default function I18nProvider({ initialLocale, dictionaries, children }: I18nProviderProperties) {

    const [locale, setLocale] = useState<string>(initialLocale);

    const value = useMemo(function () {
        return {
            locale,
            dictionaries,
            setLocale
        }
    }, [locale, dictionaries]);

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    )
}