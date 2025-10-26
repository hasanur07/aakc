import { RefAttributes, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
  ref?: RefAttributes<HTMLElement>;
};
