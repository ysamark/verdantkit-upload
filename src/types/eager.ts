/* eslint-disable @typescript-eslint/no-explicit-any */
export type BrowserNativeObject = Date | FileList | File;

/**
 * Type which can be used to index an array or tuple type.
 */
export type ArrayKey = number;

/**
 * Type which given a tuple type returns its own keys, i.e. only its indices.
 * @typeParam T - tuple type
 * @example
 * ```
 * TupleKeys<[number, string]> = '0' | '1'
 * ```
 */
export type TupleKeys<T extends ReadonlyArray<any>> = Exclude<
  keyof T,
  keyof any[]
>;

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

/**
 * Type to query whether an array type T is a tuple type.
 * @typeParam T - type which may be an array or tuple
 * @example
 * ```
 * IsTuple<[number]> = true
 * IsTuple<number[]> = false
 * ```
 */
export type IsTuple<T extends ReadonlyArray<any>> = number extends T["length"]
  ? false
  : true;

export type IsEqual<T1, T2> = T1 extends T2
  ? (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2
    ? true
    : false
  : false;

/**
 * Helper function to break apart T1 and check if any are equal to T2
 *
 * See {@link IsEqual}
 */
type AnyIsEqual<T1, T2> = T1 extends T2
  ? IsEqual<T1, T2> extends true
    ? true
    : never
  : never;
// /**
//  * Helper type for recursively constructing paths through a type.
//  * This actually constructs the strings and recurses into nested
//  * object types.
//  *
//  * See {@link Path}
//  */
// type PathImpl<K extends string | number, V, TraversedTypes> = V extends
//   | Primitive
//   | BrowserNativeObject
//   ? `${K}`
//   : true extends AnyIsEqual<TraversedTypes, V>
//   ? `${K}`
//   : `${K}` | `${K}:${PathInternal<V, TraversedTypes | V>}`;
// /**
//  * Helper type for recursively constructing paths through a type.
//  * This obscures the internal type param TraversedTypes from exported contract.
//  *
//  * See {@link Path}
//  */
// export type PathInternal<T, TraversedTypes = T> = T extends ReadonlyArray<
//   infer V
// >
//   ? IsTuple<T> extends true
//     ? {
//         [K in TupleKeys<T>]-?: PathImpl<K & string, T[K], TraversedTypes>;
//       }[TupleKeys<T>]
//     : PathImpl<ArrayKey, V, TraversedTypes>
//   : {
//       [K in keyof T]-?: PathImpl<K & string, T[K], TraversedTypes>;
//     }[keyof T];
/**
 * Helper type for recursively constructing paths through a type.
 * This actually constructs the strings and recurses into nested
 * object types.
 *
 * See {@link Path}
 */
type DotsPathImpl<K extends string | number, V, TraversedTypes> = V extends
  | Primitive
  | BrowserNativeObject
  ? `${K}`
  : true extends AnyIsEqual<TraversedTypes, V>
  ? `${K}`
  : `${K}` | `${K}.${DotsPathInternal<V, TraversedTypes | V>}`;
/**
 * Helper type for recursively constructing paths through a type.
 * This obscures the internal type param TraversedTypes from exported contract.
 *
 * See {@link Path}
 */
export type DotsPathInternal<T, TraversedTypes = T> = T extends ReadonlyArray<
  infer V
>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKeys<T>]-?: DotsPathImpl<K & string, T[K], TraversedTypes>;
      }[TupleKeys<T>]
    : DotsPathImpl<ArrayKey, V, TraversedTypes>
  : {
      [K in keyof T]-?: DotsPathImpl<K & string, T[K], TraversedTypes>;
    }[keyof T];
