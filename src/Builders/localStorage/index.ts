const rawLc = window.localStorage;
export function localStorageBuilder<storageType>() {
  return {
    get: function <T extends keyof storageType>(key: T) {
      const item = rawLc.getItem(String(key));
      let parsedValue: storageType[T];

      try {
        if (item) {
          parsedValue = JSON.parse(item);

          return parsedValue;
        } else {
          return null;
        }
      } catch (e) {
        return item;
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
