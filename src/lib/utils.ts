import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deepClone<T>(value: T, seen = new WeakMap<object, any>()): T {
  // 处理原始值、null 和 undefined
  if (value === null || typeof value !== "object") {
    return value;
  }

  // 检查循环引用
  if (seen.has(value as object)) {
    return seen.get(value as object);
  }

  // 处理 Date 对象
  if (value instanceof Date) {
    return new Date(value.getTime()) as any;
  }

  // 处理 RegExp 对象
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as any;
  }

  // 处理 Map 对象
  if (value instanceof Map) {
    const mapCopy = new Map();
    seen.set(value, mapCopy); // 缓存克隆结果，防止循环引用
    value.forEach((val, key) => {
      mapCopy.set(deepClone(key, seen), deepClone(val, seen));
    });
    return mapCopy as any;
  }

  // 处理 Set 对象
  if (value instanceof Set) {
    const setCopy = new Set();
    seen.set(value, setCopy); // 缓存克隆结果，防止循环引用
    value.forEach((val) => {
      setCopy.add(deepClone(val, seen));
    });
    return setCopy as any;
  }

  // 处理数组
  if (Array.isArray(value)) {
    const arrCopy: any[] = [];
    seen.set(value, arrCopy); // 缓存克隆结果，防止循环引用
    value.forEach((item) => {
      arrCopy.push(deepClone(item, seen));
    });
    return arrCopy as T;
  }

  // 处理普通对象
  const objCopy = Object.create(Object.getPrototypeOf(value));
  seen.set(value, objCopy); // 缓存克隆结果，防止循环引用
  Object.keys(value).forEach((key) => {
    objCopy[key] = deepClone((value as { [key: string]: any })[key], seen);
  });
  return objCopy as T;
}

/**
 * 计算年龄
 * @param {string} 出生日期
 * @returns {number} 年龄
 */
export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  const age = today.getFullYear() - birthDateObj.getFullYear();
  const month = today.getMonth() - birthDateObj.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
    return age - 1;
  }
  return age;
}

/**
 * 计算工作年限
 * @param {string} 入职日期
 * @param {string} 离职日期
 * @returns {number} 工作年限
 */
export function calculateWorkingYears(
  joinDate: string,
  leaveDate: string
): number {
  const joinDateObj = new Date(joinDate);
  const leaveDateObj = new Date(leaveDate);
  const years = leaveDateObj.getFullYear() - joinDateObj.getFullYear();
  const months = leaveDateObj.getMonth() - joinDateObj.getMonth();
  const days = leaveDateObj.getDate() - joinDateObj.getDate();
  if (days < 0) {
    return years - 1;
  }
  if (months < 0) {
    return years - 1;
  }
  if (months === 0 && days === 0) {
    return years;
  }
  return years + 1;
}

/**
 * 计算年
 * @param {string} 日期
 * @returns {number} 年
 */
export function getYear(date: string): number {
  const dateObj = new Date(date);
  return dateObj.getFullYear();
}

/**
 * 计算年月
 * @param {string} 日期
 * @returns {string} 年月
 */
export function getYearMonth(date: string): string {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  return `${year}-${month.toString().padStart(2, "0")}`;
}
