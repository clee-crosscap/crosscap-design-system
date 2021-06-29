import { useState, useEffect, useRef } from 'react';

import * as GU from '@utility/General.utility';
import * as UI from '@utility/UseInterval.utility';

interface KineticDragState {
  xi: number,
  ti: number,
  velocity: number,
}
interface KineticInertialData {
  x0: number,
  x1: number,
  t0: number,
  // tCrossover: number,
  duration: number,
  // hermiteX0: number,
  // hermiteX1: number,
  // hermiteV0: number,
  // hermiteV1: number,
}
const KINETIC_SPRING_TAU: number = 325;

// Returns log delta between the far point and near point according to distance from the boundary
// const overscrollDelta = (width: number, boundary: number, near: number, far: number): number => {
//   const OVERSCROLL_LOG_BASE: number = 100;
//   const logFn = ((x: number) => Math.log(x) / Math.log(OVERSCROLL_LOG_BASE));

//   const nNear: number = Math.abs(near - boundary) / width;  // return in normalized units
//   const nFar:  number = Math.abs(far  - boundary) / width;
//   return width * (logFn(1+nFar) - logFn(1+nNear));
// }

const getSpringPosition = ((dt: number) => {
  return 1 - Math.exp(-dt/KINETIC_SPRING_TAU);
});

export default function useKineticScroll(scrollableElement?: HTMLElement | null) {
  const dragStateRef = useRef<KineticDragState | undefined>(undefined);
  const [ kineticScrollData, setKineticInertialData ] = useState<KineticInertialData | undefined>(undefined);
  
  UI.useInterval(() => {
    if(!kineticScrollData || !scrollableElement) return;

    const {
      x0,
      x1,
      t0,
      // tCrossover,
      duration,
      // hermiteX0,
      // hermiteX1,
      // hermiteV0,
      // hermiteV1,
    } = kineticScrollData;

    const elapsedT: number = Date.now() - t0;

    let xi: number = 0;

    if(elapsedT >= duration) {
      xi = x1;
      setKineticInertialData(undefined);
    // } else if(elapsedT >= tCrossover) {
    //   const hermiteI: number = (elapsedT - tCrossover) / (duration - tCrossover);
    //   xi = hermite(hermiteI, hermiteX0, hermiteX1, hermiteV0, hermiteV1);
    } else {
      xi = x0 + (x1-x0)*getSpringPosition(elapsedT);
    }

    scrollableElement.scrollLeft = xi;
  }, kineticScrollData ? 1000/60 : undefined);
  
  // Panning cases:
  //             lLimit         rLimit           |  Calculation
  // ============================================|========================================================================
  //     region1   |    region2   |    region3   |
  // ============================================|========================================================================
  //  LEFT----RGHT |              |              |  OD(lLimit, min(RGHT, lLimit), LEFT)
  //      LEFT-----|-----RGHT     |              |  OD(lLimit, min(RGHT, lLimit), LEFT) + (RGHT   - lLimit)
  //      LEFT-----|--------------|-----RGHT     |  OD(lLimit, min(RGHT, lLimit), LEFT) + (rLimit - lLimit) + OD(rLimit, max(LEFT, rLimit), RGHT)
  //               | LEFT----RGHT |              |                                        (RGHT   - LEFT  )
  //               |     LEFT-----|-----RGHT     |                                        (rLimit - LEFT  ) + OD(rLimit, max(LEFT, rLimit), RGHT)
  //               |              | LEFT----RGHT |                                                          + OD(rLimit, max(LEFT, rLimit), RGHT)
  // const getOverscrollPanDelta = ((prevX: number, nextX: number, viewportW: number, lLimit: number, rLimit: number): number => {
  //     const left:  number = Math.min(prevX, nextX);
  //     const right: number = Math.max(prevX, nextX);

  //     // Contributions from left overscroll region (dampened), central region (undampened), and right overscroll region (dampened)
  //     const r1: number = (left   < lLimit) ? overscrollDelta(viewportW, lLimit, Math.min(right, lLimit), left) : 0;
  //     const r2 = Math.max(0, Math.max(left,  lLimit) - Math.min(right, rLimit));
  //     const r3: number = (rLimit < right ) ? overscrollDelta(viewportW, rLimit, Math.max(left, rLimit), right) : 0;
  //     return ((nextX < prevX) ? -1 : 1) * (r1 + r2 + r3);
  // });

  useEffect(() => {
    // Drag event handlers
    // Adjust overscroll delta: https://medium.com/thoughts-on-thoughts/recreating-apple-s-rubber-band-effect-in-swift-dbf981b40f35
    const onDragMousedown = ((e: MouseEvent) => {
      setKineticInertialData(undefined);
      dragStateRef.current = {
        xi: e.pageX,
        ti: Date.now(),
        velocity: 0,
      };
    });
    const onDragMousemove = ((e: MouseEvent) => {
      if(!dragStateRef.current || !scrollableElement) return;
  
      const { xi, ti, velocity } = dragStateRef.current;
      dragStateRef.current.xi = e.pageX;
      dragStateRef.current.ti = Date.now();
  
      const dx: number = (e.pageX - xi);
      const dt: number = Date.now() - ti;
      const { scrollLeft } = scrollableElement;
      // const prevX = scrollLeft;
      const nextX = scrollLeft - dx;
  
      // const overscrollDx = getOverscrollPanDelta(prevX, nextX, clientWidth, 0, scrollWidth-clientWidth);
  
      const invDtSeconds: number = 1000/(dt+1);  // +1 to avoid div/0 below
      dragStateRef.current.velocity = GU.lerp(0.8, dx * invDtSeconds, velocity);
  
      scrollableElement.scrollLeft = nextX;
    });
    const onDragMouseup = ((e: MouseEvent) => {
      if(!dragStateRef.current || !scrollableElement) return;
      const { xi, ti, velocity } = dragStateRef.current;
      dragStateRef.current = undefined;
  
      const now: number = Date.now();
      const dt: number = Date.now() - ti;
  
      // Emulate static friction on weak swipes
      if(Math.abs(xi) <= 10) return;
  
      // Solve for the delta time that creates a spring factor that updates < 1px/ms in screen space
      const { clientWidth, scrollLeft, scrollWidth } = scrollableElement;
      let animationDuration: number = -KINETIC_SPRING_TAU * Math.log(1/clientWidth) / Math.log(Math.E);
  
      // Dampen momentum with exponential decay on final hold delay (per 100ms)
      const targetDx = 0.8 * velocity * Math.pow(0.2, dt*0.01);
  
      const finalX0: number = scrollLeft;
      const finalX1: number = scrollLeft - targetDx;
      const lLimit: number = 0;
      const rLimit: number = scrollWidth - clientWidth;
  
      // See if we need to hermite back into scrollable region
      // let crossoverI: number = 1;
      // let crossoverT: number = crossoverI * animationDuration;
      // let crossoverDuration: number = 0;
      // let hermiteX0: number = finalX1;
      // let hermiteX1: number = finalX1;
      // let hermiteV0: number = 0;
      // let hermiteV1: number = 0;
  
      // const OVERSCROLL_ANIMATION_SPEED: number = 1/4;
      if((lLimit <= finalX1) && (finalX1 <= rLimit)) {
        // Case 1: All Exponential Decay
      } else {
        // TODO
      }
  
      setKineticInertialData({
        x0: finalX0,
        x1: finalX1,
        t0: now,
        // tCrossover: crossoverT,
        duration: animationDuration,
        // hermiteX0,
        // hermiteX1,
        // hermiteV0,
        // hermiteV1,
      });
    });
    scrollableElement?.addEventListener('mousedown', onDragMousedown);
    document.addEventListener('mousemove', onDragMousemove);
    document.addEventListener('mouseup', onDragMouseup);

    return () => {
      scrollableElement?.removeEventListener('mousedown', onDragMousedown);
      document.addEventListener('mousemove', onDragMousemove);
      document.addEventListener('mouseup', onDragMouseup);  
    };
  }, [ scrollableElement ]);

  const stopKineticScroll = (() => {
    dragStateRef.current = undefined;
    setKineticInertialData(undefined);
  });

  return [ stopKineticScroll ];
}