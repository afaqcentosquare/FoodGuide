import { colorPaletteContainer } from '../hooks/theme/ColorPaletteContainer'

export { default as Strings } from "./strings" ;
export { default as Colors } from "./colors" ;
export { POPPINS,MONTSERRAT,GILROY,Roboto } from './Fonts';
export { default as Fonts } from './Fonts';
import col, { default as _COLORS } from './colors'
_COLORS.colors.theme = colorPaletteContainer.dark
export const COLORS = _COLORS.colors
