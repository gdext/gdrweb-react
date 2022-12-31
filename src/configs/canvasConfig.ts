export type GDRWebCanvasConfig = {
    /** Camera pan settings */
    pan?: {
        /** Sepcifies which mouse buttons trigger camera pan. Enter a space-separated list of the following values: 'left', 'middle', 'right'
         *  @default 'left middle'
         * @example 'left middle' - left and middle mouse buttons
         */
        mouseButtons?: string,
        /** Pan with scrollwheel sensitivity relative to default. Set to 0 to disable scrollwheel panning.
         * @default 1
        */
        wheelSensitivity?: number,
        /** Inverts scroll wheel's horizontal panning direction
         * @default false
        */
        invertWheelX?: boolean,
        /** Inverts scroll wheel's vertical panning direction
         * @default false
        */
        invertWheelY?: boolean
    },
    /** Camera zoom settings */
    zoom?: {
        /** Inverts scroll wheel's zoom direction 
         * @default false
        */
        invert?: boolean,
        /** Zoom sensitivity relative to default 
         * @default 1
        */
        sensitivity?: number,
        /** Minimum zoom level
         * @default 0.2
        */
        min?: number,
        /** Maximum zoom level
         * @default 10
        */
        max?: number
    },
    /** Scroll wheel key modifiers. Modifier functions are additive, meaning they are layered on top of each other as the user presses more keys. */
    wheel?: {
        /** Scroll wheel action when no key modifiers are pressed
         * @default 'zoom'
         * @example 'zoom' - zoom in/out
        */
        normal?: string,
        /** Scroll wheel action when shift key is pressed
         * @default 'x'
         * @example 'x' - pan horizontally
        */
        shift?: string,
        /** Scroll wheel action when ctrl key is pressed
         * @default 'y'
         * @example 'y' - pan vertically
        */
        ctrl?: string,
        /** Scroll wheel action when alt key is pressed
         * @default ''
         * @example '' - no additional action
        */
        alt?: string
    }
    /** Rendering options */
    appearance?: {
        /** Show 1x1 grid behind the level
         * @default false
        */
        showGrid?: boolean,
        /** Show X and Y coordinates at the beginning of the level
         * @default false
        */
        showCoords?: boolean,
        /** Show background image behind the level
         * @default true
        */
        showBackground?: boolean,
        /** Show trigger lines and other indicators
         * @default false
        */
        showLines?: boolean
    }
}

export const defaultCanvasConfig: GDRWebCanvasConfig = {
    pan: {
        mouseButtons: 'left middle',
        wheelSensitivity: 1,
        invertWheelX: false,
        invertWheelY: false
    },
    zoom: {
        invert: false,
        sensitivity: 1,
        min: 0.2,
        max: 10
    },
    wheel: {
        normal: 'zoom',
        shift: 'x',
        ctrl: 'y',
        alt: ''
    },
    appearance: {
        showGrid: false,
        showCoords: false,
        showBackground: true,
        showLines: false
    }
}