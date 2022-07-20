export type CellAlignment = "left" | "center" | "right" | undefined;
export type CellClasses = string | ((item: any) => any) | undefined;
export type CellFormats = "currency" | string | undefined;

export interface ColumnSchema {
  label: string;
  key?: string | undefined;
  slot?: string;
  align?: CellAlignment;
  classes?: CellClasses;
  format?: CellFormats;
  computed?: (item: object) => any;
}

export interface LinkSchema {
  active?: boolean;
  url?: string;
  label?: string;
}

export interface ActionSchema {
  name?: string;
  condition?: (item: object) => boolean;
}

export function getCellAlignment(alignment: CellAlignment) {
  return {
    left: alignment != "right" && alignment != "center",
    right: alignment == "right",
    center: alignment == "center",
  };
}

export function getClasses(classes: CellClasses, item: object) {
  if (typeof classes == "string") return { [classes]: true };
  if (typeof classes == "function") return classes(item);
  return {};
}

export function getData(item: any, key: string | any) {
  if (!key.includes(".")) return item[key];
  return findData(item, key.split("."));
}

export function findData(item: any, keys: string[]): any {
  try {
    const currentKey = keys[0];
    if (keys.length == 1) return item[currentKey];
    if (currentKey == "*" && Array.isArray(item)) {
      const results = [];
      for (let i = 0; i < item.length; i++) {
        results.push(findData(item[i], keys.slice(1)));
      }
      return results.join(", ");
    }
    return findData(item[currentKey], keys.slice(1));
  } catch (error) {
    return null;
  }
}

export function getFormattedData(value: any, formatType?: CellFormats) {
  if (value === null) return "-";
  switch (formatType) {
    case "currency":
      return `€ ${new Intl.NumberFormat("it-IT").format(value)}`;
    default:
      return value;
  }
}
