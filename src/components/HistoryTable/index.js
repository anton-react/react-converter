import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: 'Currency From',
    dataIndex: 'currencyFrom',
    key: 'currencyFrom',
  },
  {
    title: 'Currency To',
    dataIndex: 'currencyTo',
    key: 'currencyTo',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Amount Converted',
    dataIndex: 'amountConverted',
    key: 'amountConverted',
  },
];

function HistoryTable({ dataSource }) {
  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
}

HistoryTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
};

export default HistoryTable;
