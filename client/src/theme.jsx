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

export const lightTheme = {
  body: '#C8C8C8',
  text: '#121620',
  components: {
    containers: {
      panel: {
        header: {
          background: '#f1f1f1',
          text: '#121620',
        },
        body: {
          background: '#f1f1f1',
          text: '#121620',
        }
      }
    }
  }
};

export const darkTheme = {
  body: '#121620',
  text: '#f1f1f1',
  components: {
    containers: {
      panel: {
        header: {
          background: '#121620',
          text: '#f1f1f1',        
        },
        body: {
          background: '#121620',
          text: '#f1f1f1',        
        }
      }
    }
  }
};