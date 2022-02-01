const rawLc = window.localStorage;
export function localStorageBuilder<storageType>() {
  return {
    get: function <T extends keyof storageType>(key: T) {
      const item = rawLc.getItem(String(key));
      let parsedValue: storageType[T];

      try {
        if (item) {
          parsedValue = JSON.parse(item) as storageType[T];

          return parsedValue;
        } else {
          return null;
        }
      } catch (e) {
        //@ts-ignore
        return item as storageType[T];
      }
    },
    set: function <T extends keyof storageType>(key: T, value: storageType[T]) {
      switch (typeof value) {
        case "string":
        case "number":
        case "boolean":
        case "object":
          rawLc.setItem(String(key), JSON.stringify(value));

          break;
        default:
          return;
      }
    },
    clearAll: function () {
      rawLc.clear();
    },
  };
}
