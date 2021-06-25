import * as React from 'react';
import {Row, Col, Grid} from 'react-native-easy-grid';

interface IProps<T> {
  data: Array<T>;
  renderItem: (item: T, index: number, data: Array<T>) => React.ReactNode;
}

function GridView<T>({data, renderItem}: IProps<T>) {
  const buildLayout = () => {
    const rows: Array<React.ReactNode> = [];
    let currRow: Array<React.ReactNode> = [];

    for (let i = 0; i < data.length; i++) {
      const datum = data[i];
      currRow.push(
        <Row size={1} key={i}>
          {renderItem(datum, i, data)}
        </Row>,
      );

      if (data.length === 2 && i === data.length - 1) {
        rows.push(
          <Col size={1} key={i}>
            {currRow}
          </Col>,
        );
      } else if (currRow.length === 2 || i === data.length - 1) {
        rows.push(
          <Row size={1} key={i}>
            {currRow}
          </Row>,
        );
        currRow = [];
      }
    }

    return rows.reverse();
  };

  return <Grid>{buildLayout()}</Grid>;
}

export default GridView;
