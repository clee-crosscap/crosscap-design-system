import { ReactComponent as _AlertSvg } from '@assets/alert.svg';
import { ReactComponent as _CheckSvg } from '@assets/check.svg';
import { ReactComponent as _CheckboxUnifiedSvg } from '@assets/checkbox-unified.svg';
import { ReactComponent as _ChevronUpSvg } from '@assets/chevron-up.svg';
import { ReactComponent as _ChevronDownSvg } from '@assets/chevron-down.svg';
import { ReactComponent as _ChevronLeftSvg } from '@assets/chevron-left.svg';
import { ReactComponent as _ChevronRightSvg } from '@assets/chevron-right.svg';
import { ReactComponent as _CloseSvg } from '@assets/close.svg';
import { ReactComponent as _EllipsisSvg } from '@assets/ellipsis.svg';
import { ReactComponent as _ExportSvg } from '@assets/export.svg';
import { ReactComponent as _FilterSvg } from '@assets/filter.svg';
import { ReactComponent as _GearFilledSvg } from '@assets/gear-filled.svg';
import { ReactComponent as _InfoSvg } from '@assets/info.svg';
import { ReactComponent as _MagnifyingGlassSvg } from '@assets/magnifying-glass.svg';
import { ReactComponent as _PencilSvg } from '@assets/pencil.svg';
import { ReactComponent as _TrashSvg } from '@assets/trash.svg';

type SvgComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
interface SvgDimensions {
  width: number,
  height: number,
}
interface SvgStyledAttrs {
  styledAttrs: {
    default:  SvgDimensions & { as: SvgComponent },
    scale:    (scale:        number) => SvgDimensions & { as: SvgComponent },
    toWidth:  (targetWidth:  number) => SvgDimensions & { as: SvgComponent },
    toHeight: (targetHeight: number) => SvgDimensions & { as: SvgComponent },
  }
}
function addWH(width: number, height: number, svg: SvgComponent): SvgComponent & SvgDimensions & SvgStyledAttrs {
  const WH = ((s: number) => ({ width: s*width, height: s*height }));
  return Object.assign(svg, {
    ...WH(1),
    styledAttrs: {
      default:  { as: svg, ...WH(1) },
      scale:    ((scale:        number) => ({ as: svg, ...WH(scale              ) })),
      toWidth:  ((targetWidth:  number) => ({ as: svg, ...WH(targetWidth /width ) })),
      toHeight: ((targetHeight: number) => ({ as: svg, ...WH(targetHeight/height) })),
    },
  });
}

export const AlertSvg           = addWH(30, 27, _AlertSvg);
export const CheckSvg           = addWH(20, 14, _CheckSvg);
export const CheckboxUnifiedSvg = addWH(18, 18, _CheckboxUnifiedSvg);
export const ChevronUpSvg       = addWH(13,  8, _ChevronUpSvg);
export const ChevronDownSvg     = addWH(13,  8, _ChevronDownSvg);
export const ChevronLeftSvg     = addWH( 8, 13, _ChevronLeftSvg);
export const ChevronRightSvg    = addWH( 8, 13, _ChevronRightSvg);
export const CloseSvg           = addWH(13, 13, _CloseSvg);
export const EllipsisSvg        = addWH(20,  4, _EllipsisSvg);
export const ExportSvg          = addWH(19, 21, _ExportSvg);
export const FilterSvg          = addWH(10, 10, _FilterSvg);
export const GearFilledSvg      = addWH(12, 12, _GearFilledSvg);
export const InfoSvg            = addWH(14, 14, _InfoSvg);
export const MagnifyingGlassSvg = addWH(16, 16, _MagnifyingGlassSvg);
export const PencilSvg          = addWH(24, 24, _PencilSvg);
export const TrashSvg           = addWH(28, 28, _TrashSvg);