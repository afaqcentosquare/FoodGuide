import { ColorPalette } from '../hooks/theme/ColorPaletteContainer'

let theme: ColorPalette | undefined

const colors = {
    white: '#FFFFFF',
    black: '#000000',
    yellow: '#FFE000',
    blue: '#1877F2',
    red: '#EF4444',
    green: '#608B2F',
    purple: '#E5BAFF',
    orange: '#F97316',

    green1: '#69FF97',
    green2: '#0F766E',

    blue1: '#E0F2FE',
    blue2: '#00E4FF',

    grey_normal: '#A1A8B2',
    grey1: '#E5E5E5',
    grey2: '#D4D4D4',

    red1: '#FEE2E2',
    red2: '#BB0000',

    viewLine : "#cbd6ee",

    transparent: 'rgba(0,0,0,0.7)',

    google: '#0F9D58',
    facebook: '#4267B2',
    twitter: '#00acee',
    online : "#00FF40",
    star : "#FDCC0D",

    theme: theme,
}

//for future, if we want to update colors from usePreferredTheme hook
export const updateAppTheme = (appTheme: ColorPalette) => {
    colors.theme = appTheme
}

export default {
    colors: colors,
}
