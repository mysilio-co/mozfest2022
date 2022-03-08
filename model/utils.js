import { RDF } from "@inrupt/vocab-common-rdf";
import { getUrlAll } from "@inrupt/solid-client";
import { useEffect, useMemo, useState, createContext, useContext } from "react";

export function isLiteralTerm(s) {
  return typeof s === "string" || s instanceof String;
}

export function hasRDFTypes(thing, ts) {
  const types = getUrlAll(thing, RDF.type);
  let hasAllTypes = true;
  for (let t of ts) {
    const s = isLiteralTerm(t) ? t : t.value;
    hasAllTypes = hasAllTypes && types.includes(s);
  }
  return hasAllTypes;
}

export function hasRDFType(thing, t) {
  return hasRDFTypes(thing, [t]);
}

export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [modified, setModified] = useState(Date.now());
  const storedValue = useMemo(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  }, [key, modified]);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        setModified(Date.now());
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export const WebMonetizationContext = createContext();

export const WebMonetizationProvider = ({ children }) => {
  const [isMonetizing, setIsMonetizing] = useState(false);
  const [unscaledTotal, setUnscaledTotal] = useState(0);
  const [assetScale, setAssetScale] = useState(0);
  const [assetCode, setAssetCode] = useState("");
  const scaledTotal = useMemo(() => {
    return (unscaledTotal * Math.pow(10, -assetScale)).toFixed(assetScale);
  }, [unscaledTotal, assetScale]);

  const handleStart = () => setIsMonetizing(true);

  const handleProgress = (ev) => {
    // initialize currency and scale on first progress event
    setIsMonetizing(true);
    if (unscaledTotal === 0) {
      setAssetScale(ev.detail.assetScale);
      setAssetCode(ev.detail.assetCode);
    }

    setUnscaledTotal((currentTotal) => currentTotal + Number(ev.detail.amount));
  };

  useEffect(() => {
    if (document.monetization) {
      document.monetization.addEventListener("monetizationstart", handleStart);
      document.monetization.addEventListener(
        "monetizationprogress",
        handleProgress
      );
    }
    return () => {
      if (document.monetization) {
        document.monetization.removeEventListener(
          "monetizationstart",
          handleStart
        );
        document.monetization.removeEventListener(
          "monetizationprogress",
          handleProgress
        );
      }
    };
  }, []);

  return (
    <WebMonetizationContext.Provider
      value={{
        isMonetizing,
        total: scaledTotal,
        currency: assetCode,
      }}
    >
      {children}
    </WebMonetizationContext.Provider>
  );
};

export function useWebMonetization() {
  return useContext(WebMonetizationContext);
}
