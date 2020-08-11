import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import styles from './styles.module.less';
const { Option } = Select;

function SelectCurrency({ currencies, value, onChange }) {
  return (
    <Select
      className={styles.select}
      value={value}
      style={{ width: '100%' }}
      onChange={onChange}
    >
      {currencies.map((currency) => (
        <Option key={currency.key} value={currency.key}>
          {currency.value}
        </Option>
      ))}
    </Select>
  );
}

SelectCurrency.propTypes = {
  currencies: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SelectCurrency;
