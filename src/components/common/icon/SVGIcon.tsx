import React, { useMemo } from "react";
import { Icons, IconsData } from "../../../resources/Icons";

export const SVGIcon = ({ className = '', iconName }) => {

  const SvgComponent = useMemo(() => IconsData[iconName], [iconName]);

  return <SvgComponent className={`${className} svg-icon`} style={{ width: '100%', height: '100%' }} />
}    