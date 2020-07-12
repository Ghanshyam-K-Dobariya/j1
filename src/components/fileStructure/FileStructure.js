import React from 'react';
import _get from 'lodash/get';

// Constants
import { FILE_TYPES, EMPTY_ARRAY } from './constants/fileStructure.general';

// Componenets
import FileView from './widgets/fileView';

// Css
import style from './fileStructure.module.css';

const ROOT_DIRECTORY = {
  path: '',
  name: 'root',
  files: {
    gj: {
      id: 'gj',
      name: 'Gujarat',
      path: 'files.gj',
      type: FILE_TYPES.DIRECTORY,
      createdAt: 1594567629081,
      files: {
        st: {
          id: 'st',
          name: 'Surat',
          path: 'files.gj.files.st',
          type: FILE_TYPES.FILE,
          files: null,
          createdAt: 1594567657185,
        },
        ahm: {
          id: 'ahm',
          name: 'Ahmedabad',
          path: 'files.gj.files.ahm',
          type: FILE_TYPES.FILE,
          files: null,
          createdAt: 1594567671506,
        }
      }
    },
    ka: {
      id: 'ka',
      name: 'Karnataka',
      path: 'files.ka',
      type: FILE_TYPES.DIRECTORY,
      createdAt: 1594567580807,
      files: {
        blr: {
          id: 'blr',
          name: 'Bangalore',
          path: 'files.ka.files.blr',
          type: FILE_TYPES.FILE,
          files: null,
          createdAt: 1594567616202,
        },
        otherPlaces: {
          id: 'otherPlaces',
          name: 'Tourist Places',
          path: 'files.ka.files.otherPlaces',
          type: FILE_TYPES.DIRECTORY,
          files: {},
          createdAt: 1594567789530,
        },
        itCities: {
          id: 'itCities',
          name: 'IT Cities',
          path: 'files.ka.files.itCities',
          type: FILE_TYPES.DIRECTORY,
          createdAt: 1594568151104,
          files: {
            blr101: {
              id: 'blr101',
              name: 'Bangalore',
              path: 'files.ka.itCities.files.blr101',
              type: FILE_TYPES.FILE,
              files: null,
              createdAt: 1594568159815,
            },
            mys: {
              id: 'mys',
              name: 'MySore',
              path: 'files.ka.itCities.files.mys',
              type: FILE_TYPES.FILE,
              files: null,
              createdAt: 1594568166911,
            },
          },
          createdAt: 1594567789530,
        }
      }
    },
    goa: {
      id: 'goa',
      name: 'Goa',
      path: 'files.goa',
      type: FILE_TYPES.FILE,
      files: null,
      createdAt: 1594567542066,
    },
  },
  type: FILE_TYPES.DIRECTORY,
};

const INTIAIL_STATE = {
  fileSystem: ROOT_DIRECTORY,
  activePath: ROOT_DIRECTORY.path,
};

class FileStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = INTIAIL_STATE;
  }

  updateActivePath = (activePath, type) => {
    if (type === FILE_TYPES.FILE) return null;

    this.setState({ activePath });
  }

  goBack = () => {
    const { activePath: oldPath } = this.state;
    if (!oldPath) {
      return null;
    }
    const path = oldPath.split('.');
    while(path.length > 0 && path.pop() !== 'files') {}
    const activePath = path.join('.');
    this.setState({ activePath })
  }

  getCurrentFolderFiles = () => {
    const { activePath, fileSystem } = this.state;
    if (activePath) {
      const path = `${activePath}.files`;
      return _get(fileSystem, path, EMPTY_ARRAY);
    }
    return ROOT_DIRECTORY.files;
  }

  render() {
    const { activePath, fileSystem } = this.state;
    const currentFolderFiles = this.getCurrentFolderFiles();

    return (
      <div>
        <h1
          onClick={this.goBack}
          className={`${style.goBackHeader} ${activePath ? '' : style.hide}`}
        >
          &lt; Go Back
        </h1>
        <FileView
          files={currentFolderFiles}
          updateActivePath={this.updateActivePath}
        />
      </div>
    );
  }
}

export default FileStructure;
