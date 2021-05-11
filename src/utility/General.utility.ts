// Typescript
export function getValue<V extends keyof any>(v: V) { return v }
export function isDefined<T>(v: T | undefined): v is T { return v !== undefined }
export function isTruthy<T>(v: T | any): v is T { return !!v }

// Math
export function clamp(x: number, min: number, max: number): number {
  return Math.max(Math.min(x, max), min);
}

// Strings
export function zeroPad(n: number | string, l: number): string {
  return `${n}`.length > l ? `${n}` : ('0'.repeat(l) + n).slice(-l);
}

// Animation
export function lerp(i: number, a: number, b: number): number {
  return (1-i)*a + i*b;
}
export function solveLerp(a: number, b: number, c: number): number {
  return (c-a)/(b-a);
}
export function lerpValue(t: number, t0: number, t1: number, v0: number, v1: number, timingFn: (v: number) => number = (v=>v)): number {
  return lerp(timingFn(clamp(solveLerp(t0, t1, t), 0, 1)), v0, v1);
}

// Abstract Data Types
export function binarySearch<T, U=T>(a: T[], k: U, compareFn: (a: T, b: U) => number = (a,b) => +a-+b): number {
  let left: number = 0;
  let right: number = a.length-1;
  while(left <= right) {
    let mid: number = Math.floor(0.5*(left+right)) ;
    let cmp: number = compareFn(a[mid], k);
    if(cmp < 0) {
      left = mid + 1;
    } else if(cmp > 0) {
      right = mid - 1;
    } else {
      return mid;
    }
  }
  return -(left + 1);
}

export function getInsertPosition<T, U=T>(a: T[], k: U, compareFn: (a: T, B: U) => number): number {
  let idx: number = binarySearch<T, U>(a, k, compareFn);
  return (idx >= 0) ? idx : -(idx+1);
}

export function getUnionSet<T>(a: T[] | Set<T>, b: T[] | Set<T>): Set<T> {
  return new Set([ ...a ,  ...b ]);
}
export function getIntersectionSet<T>(a: T[] | Set<T>, b: T[] | Set<T>): Set<T> {
  const aSet: Set<T> = new Set(a);
  const bSet: Set<T> = new Set(b);
  const [ less, more ] = (aSet.size <= bSet.size) ? [ aSet, bSet ] : [ bSet, aSet ];
  less.forEach(v => {
    if(!more.has(v)) {
      less.delete(v);
    }
  });
  return less;
}
export function getDifferenceSet<T>(a: T[] | Set<T>, b: T[] | Set<T>): Set<T> {
  const resultSet: Set<T> = new Set(a);
  b.forEach((v: T) => resultSet.delete(v));
  return resultSet;
}

// Dom Traversal
type PathElementType = HTMLElement | SVGSVGElement | Element;
export function getPath(ele: PathElementType | null | undefined): PathElementType[] {
  let path: PathElementType[] = [];
  for(let n: PathElementType | null | undefined = ele; n; n = n.parentElement ?? undefined) {
    path.unshift(n);
  }
  return path;
}

