// libs/shared-fonts/src/lib/fonts.ts
export const loadFonts = () => {
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'Roboto';
      src: url('/static/Roboto-Regular.ttf') format('ttf');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Roboto';
      src: url('/static/Roboto-Bold.ttf') format('ttf');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Open Sans';
      src: url('/static/OpenSans-Regular.ttf') format('ttf');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Open Sans';
      src: url('/static/OpenSans-Bold.ttf') format('woff2');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
    }
    body {
      font-family: 'Roboto', 'Open Sans', sans-serif;
    }
  `;
  document.head.appendChild(style);
};