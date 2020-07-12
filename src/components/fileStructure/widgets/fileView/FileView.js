import React from 'react';
import _sortBy from 'lodash/sortBy';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _curry from 'lodash/curry';

// Constatns
import { FILE_TYPES } from '../../constants/fileStructure.general';

// Styles
import style from './fileView.module.css';

const CLASS_VIEW_BY_TYPE = {
  [FILE_TYPES.DIRECTORY]: style.directoryView,
  [FILE_TYPES.FILE]: style.fileView,
};

const renderFile = _curry((updateActivePath, file) => {
  const { id, name, path, type } = file
  return (
    <div
      className={CLASS_VIEW_BY_TYPE[type]}
      data-id={id}
      data-path={path}
      onDoubleClick={() => updateActivePath(path, type)}
    >
      <span className={style.title}>{name}</span>
    </div>
  );
});

const FileView = (props) => {
  const { files, updateActivePath } = props;
  const filesInCreatedOrder = _sortBy(files, 'createdAt');

  if (_isEmpty(filesInCreatedOrder)) {
    return <h3>Empty Folder.....</h3>
  }

  return (
    <div className={style.filesContainer}>
      {_map(filesInCreatedOrder, renderFile(updateActivePath))}
    </div>
  )
};

export default React.memo(FileView);
