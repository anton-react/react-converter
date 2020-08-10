import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Select } from 'antd';
import { getCurrencies } from 'src/store/actions/currencies';
import styles from './Dashboard.module.less';

const { Option } = Select;

function Dashboard({ history }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.currencies.loading);
  const currencies = useSelector((state) => state.currencies.currencies);

  console.log('loading', loading);

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <>
      <Select
        defaultValue={currencies[0].key}
        style={{ width: 220 }}
        onChange={handleChange}
      >
        {currencies.map((currency) => (
          <Option value={currency.key}>{currency.value}</Option>
        ))}
      </Select>
      <Select
        defaultValue={currencies[0].key}
        style={{ width: 220 }}
        onChange={handleChange}
      >
        {currencies.map((currency) => (
          <Option value={currency.key}>{currency.value}</Option>
        ))}
      </Select>
    </>
  );
}

export default withRouter(Dashboard);
