export function GlobalStyle() {
    return (
        <style jsx global>{`
            *,
            *:before,
            *:after {
                -webkit-overflow-scrolling: touch;
                box-sizing: border-box;
            }

            html,
            body {
                margin: 0;
                height: 100%;
                overflow-x: hidden;
                line-height: 1.6;
                font-weight: 400;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                    Helvetica Neue, sans-serif;
                color: #222;
                // -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
                text-rendering: optimizeLegibility;

                -moz-font-feature-settings: "kern" 1;
                -ms-font-feature-settings: "kern" 1;
                -o-font-feature-settings: "kern" 1;
                -webkit-font-feature-settings: "kern" 1;
                font-feature-settings: "kern" 1;
                font-kerning: normal;
            }
        `}</style>
    )
}
