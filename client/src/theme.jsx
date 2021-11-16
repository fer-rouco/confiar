import './index.css';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  .footer {
    position: absolute;
    height: 68px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 300px;
    bottom: 0;
    width: 100%;
    z-index: -1;
  }

  .developed-by {
    padding-top: 8px;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;

const backgroundLight = '#C8C8C8';
const textLight = '#121620';
export const lightTheme = {
  background: backgroundLight,
  text: textLight,
  components: {
    bars: {
      navBar: {},
      sideBar: {}
    },
    containers: {
      panel: {
        header: {
          firstStep: {
            background: '#cccccc'  
          },
          background: '#B8B0AD',
          text: '#00956A',
        },
        body: {
          background: '#eeeeee',
          text: textLight,
        }
      }
    },
    controls: {
      buttons: {
        button: {}
      },
      fields: {
        input: {},
        select: {}
      },
      fileUpload: {}
    }
  }
};

const backgroundDark = '#555555';
const textDark = '#f1f1f1';
export const darkTheme = {
  background: backgroundDark,
  text: textDark,
  components: {
    bars: {
      navBar: {},
      sideBar: {}
    },
    containers: {
      panel: {
        header: {
          firstStep: {
            background: '#cccccc'  
          },
          background: '#555555',
          text: '#f1f1f1',        
        },
        body: {
          background: '#555555',
          text: '#f1f1f1',        
        }
      }
    },
    controls: {
      buttons: {
        button: {}
      },
      fields: {
        input: {},
        select: {}
      },
      fileUpload: {}
    }
  }
};

export const navigateIntoObjectByPath = (theme, path) => {
  const navigateIntoObject = (object, path) => path.split('.').reduce((pathPartA, pathPartB) => pathPartA && pathPartA[pathPartB], object);
  return navigateIntoObject(theme, "components.containers.panel." + path);
}