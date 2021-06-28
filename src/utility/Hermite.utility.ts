// Calculate factors based on basis functions:
// https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
const h00   = ((t: number) =>  2*Math.pow(t, 3) - 3*Math.pow(t, 2)       + 1);  //  2t^3 - 3t^2     + 1
const h10   = ((t: number) =>    Math.pow(t, 3) - 2*Math.pow(t, 2) +   t    );  //   t^3 - 2t^2 + t
const h01   = ((t: number) => -2*Math.pow(t, 3) + 3*Math.pow(t, 2)          );  // -2t^3 + 3t^2
const h11   = ((t: number) =>    Math.pow(t, 3) -   Math.pow(t, 2)          );  //   t^3 -  t^2

const h00dt = ((t: number) =>                     6*Math.pow(t, 2) - 6*t    );  //         6t^2 - 6t
const h10dt = ((t: number) =>                     3*Math.pow(t, 2) - 4*t + 1);  //         3t^2 - 4t + 1
const h01dt = ((t: number) =>                   - 6*Math.pow(t, 2) + 6*t    );  //        -6t^2 + 6t
const h11dt = ((t: number) =>                     3*Math.pow(t, 2) - 2*t    );  //         3t^2 - 2t

export default function hermite(t: number, x0: number, x1: number, m0: number, m1: number, isFirstDerivative: boolean = false): number {
  if(!isFirstDerivative) {
    return h00(t)*x0 + h01(t)*x1 + h10(t)*m0 + h11(t)*m1;
  } else {
    return h00dt(t)*x0 + h01dt(t)*x1 + h10dt(t)*m0 + h11dt(t)*m1;
  }
}



