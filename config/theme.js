import { base } from '@theme-ui/presets'
export default {
    ...base,
    styles: {
        ...base.styles,
    },
    // rebass variants
    buttons: {
        primary: {
            fontSize: 2,
            fontWeight: 'bold',
            color: 'background',
            bg: 'primary',
            borderRadius: 'default',
        },
        outline: {
            variant: 'buttons.primary',
            color: 'primary',
            bg: 'transparent',
            boxShadow: 'inset 0 0 2px',
        },
        secondary: {
            variant: 'buttons.primary',
            color: 'background',
            bg: 'secondary',
        },
    },
}