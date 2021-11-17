import './index.css';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.global.bgColor};
    color: ${({ theme }) => theme.global.color};
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
  
  // Scrollbar
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: ${({ theme }) => theme.global.scrollbar.bgColor};
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: ${({ theme }) => theme.global.scrollbar.bgColor};
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.global.scrollbar.thumb.bgColor};
    background-image: -webkit-gradient(linear, 0 0, 0 100%, color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.5, transparent), to(transparent));
  }
  


`;

const bgColorLight = '#C8C8C8';
const colorLight = '#121620';
const headerBgColorLight = '#B8B0AD';
const headerColorLight = '#00956A';
const bodyBgColorLight = '#ebecec';
const bodyColorLight = colorLight;
const fieldBgColorLight = '#009468';
const fieldColorLight = '#ffffff';
export const lightTheme = {
  global: {
    bgColor: bgColorLight,
    color: colorLight,
    scrollbar: {
      bgColor: '#CCCCCC',
      thumb: {
        bgColor: '#009468'
      }
    }
  },
  components: {
    bars: {
      navBar: {},
      sideBar: {
        bgColor: headerBgColorLight,
        color: headerColorLight,
        profile: {
          icon: {
            color: '#009468'
          }
        }
      }
    },
    containers: {
      panel: {
        header: {
          firstStep: {
            bgColor: '#cccccc'  
          },
          bgColor: headerBgColorLight,
          color: headerColorLight,
        },
        body: {
          bgColor: bodyBgColorLight,
          color: bodyColorLight,
        }
      }
    },
    controls: {
      buttons: {
        button: {}
      },
      fields: {
        input: {
          bgColor: fieldBgColorLight,
          color: fieldColorLight
        },
        select: {
          bgColor: fieldBgColorLight,
          color: fieldColorLight
        }
      },
      fileUpload: {
        item: {
          bgColor: '#009468',
          closeButton: {
            bgColor: 'lightgreen',
            color: 'black'
          },
          imageButton: {
            bgColor: 'lightgreen',
            color: 'black'
          }
        }
      }
    },
    dialog: {
      header: {
        bgColor: headerBgColorLight,
        color: headerColorLight,
      },
      body: {
        bgColor: bodyBgColorLight,
        color: bodyColorLight,
      },
      footer: {
        bgColor: bodyBgColorLight,
        color: bodyColorLight,
      }
    },
    general: {},
    table: {
      header: {
        bgColor: headerBgColorLight,
        color: headerColorLight,
      },
      cell: {
        head: {
          color: 'cadetblue'
        },
        primary: {
          bgColor: '#FFFFFF',
        },
        secondary: {
          bgColor: '#F0F0F0',
        },
        action: {
          color: '#dc3545'
        },
      }
    }
  }
};

const bgColorDark = '#222222';
const colorDark = '#f1f1f1';
const headerBgColorDark = '#555555';
const headerColorDark = '#00956A';
const bodyBgColorDark = '#333333';
const bodyColorDark = '#f1f1f1';
const fieldBgColorDark = '#009468';
const fieldColorDark = '#ffffff';
export const darkTheme = {
  global: {
    bgColor: bgColorDark,
    color: colorDark,
    scrollbar: {
      bgColor: '#555555',
      thumb: {
        bgColor: '#009468'
      }
    }
  },
  components: {
    bars: {
      navBar: {},
      sideBar: {
        bgColor: headerBgColorDark,
        color: headerColorDark,
        profile: {
          icon: {
            color: '#009468'
          }
        }
      }
    },
    containers: {
      panel: {
        header: {
          firstStep: {
            bgColor: '#555555'  
          },
          bgColor: headerBgColorDark,
          color: headerColorDark,
        },
        body: {
          bgColor: bodyBgColorDark,
          color: bodyColorDark,        
        }
      }
    },
    controls: {
      buttons: {
        button: {}
      },
      fields: {
        input: {
          bgColor: fieldBgColorDark,
          color: fieldColorDark
        },
        select: {
          bgColor: fieldBgColorDark,
          color: fieldColorDark
        }
      },
      fileUpload: {
        item: {
          bgColor: '#009468',
          closeButton: {
            bgColor: 'lightgreen',
            color: 'black'
          },
          imageButton: {
            bgColor: 'lightgreen',
            color: 'black'
          }
        }
      }
    },
    dialog: {
      header: {
        bgColor: headerBgColorDark,
        color: headerColorDark,
      },
      body: {
        bgColor: bodyBgColorDark,
        color: bodyColorDark   
      },
      footer: {
        bgColor: bodyBgColorDark,
        color: bodyColorDark   
      }
    },
    general: {},
    table: {
      header: {
        bgColor: headerBgColorDark,
        color: headerColorDark,
      },
      cell: {
        head: {
          color: '#0d6efd'
        },
        primary: {
          bgColor: '#888888',
        },
        secondary: {
          bgColor: '#999999',
        },
        action: {
          color: '#dc3545'
        },
      }
    }
  }
};

export const navigateIntoObjectByPath = (theme, path) => {
  const navigateIntoObject = (object, path) => path.split('.').reduce((pathPartA, pathPartB) => pathPartA && pathPartA[pathPartB], object);
  return navigateIntoObject(theme, path);
}
