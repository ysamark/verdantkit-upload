export const isClientSide = () => {
  const nativeCodeRe = /({\s*\[native code\]\s*})/;

  return Boolean(
    typeof window === "object" &&
      typeof window.document === "object" &&
      typeof window.location === "object" &&
      typeof window.location.href === "string" &&
      typeof window.localStorage === "object" &&
      typeof window.localStorage.setItem === "function" &&
      nativeCodeRe.test(window.localStorage.setItem.toString())
  );
};
