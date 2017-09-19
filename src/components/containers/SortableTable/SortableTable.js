import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';

import SortableTableHeaderRow from './sortable-table-header-components/SortableTableHeaderRow';
import SortableTableRow from './SortableTableRow';
import SortableTableEmptyDataRow from './SortableTableEmptyDataRow';
import {getArrByTemplate} from '../../../utils/table-helpers/table.utils';

export default class SortableTable extends PureComponent {
  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onHeaderCellClick: PropTypes.func.isRequired,
    onCellClick: PropTypes.func.isRequired,
    sortingOrder: PropTypes.oneOf(['asc', 'desc']).isRequired,
    columnNameSortBy: PropTypes.string.isRequired,
  };

  getSortableTableRows = (rowsData) => {
    const {onCellClick, columnNameSortBy, headers} = this.props;

    return _.cond([
      [_.negate(_.isEmpty), _.map(rowData =>
        <SortableTableRow
          key={_.uniqueId('__SortableTableRow__')}
          rowData={rowData}
          onCellClick={onCellClick}
          columnNameSortBy={columnNameSortBy}
          headers={headers}
        />)],
      [_.T, () => <SortableTableEmptyDataRow />],
    ])(rowsData);
  };

  resizeFixedTables = () => {
    const tableNames = _.head(document.getElementsByClassName('table-patients-name'));
    const tableControls = _.head(document.getElementsByClassName('table-patients-controls'));
    const tableFull = _.head(document.getElementsByClassName('table-patients-full'));

    if (tableNames && tableControls && tableFull) {
      const tableNamesRows = _.last(tableNames.children).children;
      const tableControlsRows = _.last(tableControls.children).children;
      const tableFullRows = _.last(tableFull.children).children;

      const tds = _.head(tableFullRows).children;

      tableNames.style.width = `${_.head(tds).offsetWidth + 1}px`;
      tableControls.style.width = `${tds[tds.length - 1].offsetWidth}px`;

      Array.prototype.forEach.call(tableFullRows, (row, i) => {
        const height = row.offsetHeight;
        tableNamesRows[i].style.height = `${height}px`;
        tableControlsRows[i].style.height = `${height}px`;
      });
    }
  };

  render() {
    const {headers, data, onHeaderCellClick, sortingOrder} = this.props;
    const rowsData = getArrByTemplate(headers, data);
    const headersName = [_.head(headers)];
    const headersView = [_.last(headers)];
    const rowsDataName = rowsData.map(el => el.filter(el => el.name === 'name'));
    const rowsDataView = rowsData.map(el => el.filter(el => el.name === 'viewPatientNavigation'));

    setTimeout(() => this.resizeFixedTables());

    window.addEventListener('resize', () => {
      this.resizeFixedTables()
    });

    return (
      <div>
        {data.length ? <table
          className="table table-striped  table-bordered table-sorted table-hover table-fixedcol table-patients-name"
        >
          <colgroup>
            {/*//TODO inject theme here*/}
            {/*//HARDCODE*/}
            <col style={{width: 150}}/>
          </colgroup>
          <thead>
          <SortableTableHeaderRow
            headers={headersName}
            onHeaderCellClick={onHeaderCellClick}
            sortingOrder={sortingOrder}
          />
          </thead>
          <tbody>
          {this.getSortableTableRows(rowsDataName)}
          </tbody>
        </table> : null }
        <table
          className="table table-striped table-bordered table-sorted table-hover table-fixedcol table-patients-full rwd-table"
        >
          <colgroup>
            {/*//TODO inject theme here*/}
            {/*//HARDCODE*/}
            <col style={{width: 150}}/>
            <col style={{width: 300}}/>
            <col style={{width: 105}}/>
            <col style={{width: 90}}/>
            <col style={{width: 115}}/>
            <col style={{width: 110}}/>
            <col style={{width: 110}}/>
            <col style={{width: 110}}/>
            <col style={{width: 110}}/>
            <col style={{width: 110}}/>
          </colgroup>
          <thead>
          <SortableTableHeaderRow
            headers={headers}
            onHeaderCellClick={onHeaderCellClick}
            sortingOrder={sortingOrder}
          />
          </thead>
          <tbody>
          {this.getSortableTableRows(rowsData)}
          </tbody>
        </table>
        {data.length ? <table
          className="table table-striped table-bordered table-sorted table-fixedcol table-patients-controls"
        >
          <colgroup>
            {/*//TODO inject theme here*/}
            {/*//HARDCODE*/}
            <col style={{width: 110}}/>
          </colgroup>
          <thead>
          <SortableTableHeaderRow
            headers={headersView}
            onHeaderCellClick={onHeaderCellClick}
            sortingOrder={sortingOrder}
          />
          </thead>
          <tbody>
          {this.getSortableTableRows(rowsDataView)}
          </tbody>
        </table> : null }
      </div>)
  }
}

