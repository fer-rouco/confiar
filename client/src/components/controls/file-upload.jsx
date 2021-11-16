import { useState } from 'react';
import styled from 'styled-components';
import { useDialog } from '../../contexts/dialog-context';
import { navigateIntoObjectByPath } from '../../theme';
import { contentDialogConfig } from '../dialog/dialog-config';
import Button from './buttons/button';
import { useModel } from './fields/model-context';


const getThemeAttribute = (theme, attrribute) => {
  return navigateIntoObjectByPath(theme, "components.controls.fileUpload." + attrribute);
}

const StyledContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 16px;
  margin-bottom: 20px;

  &.onDragOver {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  }

`;

const StyledFileContainer = styled.div`
  background-color: ${({ theme }) => getThemeAttribute(theme, "item.bgColor")};
  border-radius: 5px;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 10px;
  height: 54px;
  margin-bottom: 10px;
`;

const StyledImageContainer = styled.img`
  width: 600px;
  margin: 10px;
  display: inline-block;
  //float:left
`;

const StyledLabel = styled.label`
  padding-bottom: 16px;
`;

const StyledSpan = styled.span`
  text-decoration: underline;
  -webkit-text-decoration-skip: ink;
  text-decoration-skip-ink: auto;
  -webkit-text-decoration-color: #a7a4a4;
  text-decoration-color: #a7a4a4;
  cursor: pointer;
`;

const StyledCloseButton = styled(Button)`
  background-color: ${({ theme }) => getThemeAttribute(theme, "item.closeButton.bgColor")};
  color: ${({ theme }) => getThemeAttribute(theme, "item.closeButton.color")};
  border-radius: 20px;
  padding: 10px;
  margin-right: 10px;
  position: absolute;
  display: inline-block;
  z-index: 1;
`;

const StyledImageButton = styled.div`
  background-color: ${({ theme }) => getThemeAttribute(theme, "item.imageButton.bgColor")};
  color: ${({ theme }) => getThemeAttribute(theme, "item.imageButton.color")};
  border-radius: 20px;
  padding: 10px;
  width: 35px;
  height: 35px;
  display: inline-flex;
  float: right;
  position: relative;
  cursor: pointer;
`;

const StyledFileNameLabel = styled.label`
  // line-height: 1.2;
  // text-overflow: ellipsis;
  // overflow: hidden;
  // white-space: nowrap;
  // position: absolute;
`;

const StyledFileSizeLabel = styled.label`
  font-size: 10px;
  display: block;
  top: 10px;
`;

const StyledLabelContainer = styled.div`
  line-height: 1.2;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  display: inline-block;
  width: calc(85%);
  top: 5px;
  padding-left: 42px;
`;


export default function FileUpload(props) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [model, setModel] = useModel();
  const dialogContext = useDialog();

  function getFilesFromModel() {
    return (model && model[props.attr]) ? model[props.attr] : [];
  }
  
  function setFilesToModel(files) {
    let modelCopy = Object.assign({}, model);
    modelCopy[props.attr] = files;
    setModel(modelCopy);
  }

  function createFileInfoObject(file, content) {
    let extension;
    let name;
    let splittedFileName = file.name.split('.');
    if (splittedFileName.length > 1) {
      extension = splittedFileName[splittedFileName.length - 1];
      splittedFileName.pop();
      name = splittedFileName.toString().replaceAll(',', '.');
    }
    else {
      name = file.name;
    }
    return {
      name,
      extension,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      content: base64RemovePrefix(content)
    }
  }

  async function readFile(file) {
    return new Promise(function (resolve, reject) {
      if (file) {
        var reader = new FileReader();
        if (file.type.indexOf("image") > -1) {
          reader.readAsDataURL(file);
        }
        if (file.type.indexOf("text") > -1) {
          reader.readAsText(file, "UTF-8");
        }
  
        reader.onload = function (evt) {
          resolve(createFileInfoObject(file, evt.target.result));
        }
        reader.onerror = function (evt) {
          reject(createFileInfoObject(file, "error reading file"));
        }
      }  
    });
  }

  function readAndSetFilesToState(dataTransferFiles) {
    let dropedFiles = Array.from(dataTransferFiles);
    let filesObjects = [];
    const modelFiles = getFilesFromModel();
    dropedFiles.forEach((fileItem) => {
      readFile(fileItem).then((file) => {
        filesObjects.push(file);
        if (dropedFiles.length === filesObjects.length) {
          setFilesToModel([...modelFiles, ...filesObjects]);
        }
      });
    });
  }

  function browseFiles() {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = 'multiple';
    input.onchange = _ => {
      // you can use this method to get file and perform respective operations
      let file = Array.from(input.files)[0];
      readAndSetFilesToState(input.files);
    };
    input.click();
  }


  function removeItem(event, fileToRemove) {
    event.stopPropagation();
    const filesBeforeRemove = getFilesFromModel().filter((fileItem) => { 
      return fileItem != fileToRemove; 
    })
    setFilesToModel(filesBeforeRemove);
  }
  
  function showItem(event, fileToShow) {
    event.stopPropagation();

    dialogContext.setConfig(contentDialogConfig({
      title: getAlertTitle(fileToShow),
      content: getAlertImageContainer(fileToShow)
    }));

    dialogContext.showDialog();
  }

  function getItemSize(size) {
    return Math.round(size / 1024) + " KB";
  }

  function handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();

    setIsDragOver(true);
  }

  function handleDragLeave(event) {
    event.stopPropagation();
    event.preventDefault();

    setIsDragOver(false);
 }

 function handleDrop(event) {
    event.preventDefault();
    setIsDragOver(false);

    readAndSetFilesToState(event.dataTransfer.files);
 }

 const buildFilesRepresentationInDOM = () => (
    getFilesFromModel().map(
      fileItem => (
        <StyledFileContainer key={fileItem.lastModified + Math.round(Math.random() * 100000)} onClick={(event) => event.stopPropagation()}>
          <StyledCloseButton close small onClick={(event) => removeItem(event, fileItem)} ></StyledCloseButton>
          <StyledLabelContainer>
            <StyledFileNameLabel>{fileItem.name}</StyledFileNameLabel>
            <StyledFileSizeLabel>{getItemSize(fileItem.size)}</StyledFileSizeLabel>
          </StyledLabelContainer>
          <StyledImageButton className="bi bi-image" onClick={(event) => showItem(event, fileItem)} ></StyledImageButton>
        </StyledFileContainer>
      )
    )
  );
  
  const getAlertImageContainer = (fileToShow) => (
    <StyledImageContainer src={base64AddPrefix(fileToShow) + fileToShow.content} ></StyledImageContainer>
  );
    
  function getAlertTitle(fileToShow) {
    return fileToShow.name;
  };

  // function base64ToByteArray(base64String) {
  //   return Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
  // }

  // function byteArrayToBase64( buffer ) {
  //   var binary = '';
  //   var bytes = new Uint8Array( buffer );
  //   var len = bytes.byteLength;
  //   for (var i = 0; i < len; i++) {
  //       binary += String.fromCharCode( bytes[ i ] );
  //   }
  //   return window.btoa( binary );
  // }

  function base64AddPrefix(document) {
    return "data:%s;base64,".replace(/%s/g, document.type); 
  }
  
  function base64RemovePrefix(content) {
    return content.split(',')[1];
  }

  return (
    <div>
      <StyledContainer className={(isDragOver) ? 'onDragOver' : ''} onClick={browseFiles} onDrop={event => handleDrop(event)} onDragOver={event => handleDragOver(event)} onDragLeave={event => handleDragLeave(event)} >
        <StyledLabel>{props.label}</StyledLabel>
        {
          (getFilesFromModel().length === 0) ? 
            (
              <StyledLabel>Arrastre y suelte sus archivos o haga click aqui para <StyledSpan tabIndex="0">Navegar</StyledSpan></StyledLabel>
            )
            : 
            (
              buildFilesRepresentationInDOM()
            )
        }
      </StyledContainer>
    </div>
  )
}
