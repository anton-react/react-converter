import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Layout, Input, Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';

import { getCurrencies, convertCurrency } from 'src/store/actions/currencies';
import SelectCurrency from 'src/components/SelectCurrency';
import styles from './styles.module.less';

const { Header, Content } = Layout;

function Dashboard() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.currencies.loading);
  const converting = useSelector((state) => state.currencies.converting);
  const currencies = useSelector((state) => state.currencies.currencies);
  const history = useSelector((state) => state.currencies.history);
  const didMount = useRef(false);

  const [amount, setAmount] = useState(null);
  const [amountConverted, setAmountConverted] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState(currencies[0]?.key);
  const [currencyTo, setCurrencyTo] = useState(currencies[1]?.key);

  const disabled = amount <= 0;

  console.log('loading', loading);

  useEffect(() => {
    if (didMount.current && history.length) {
      const lastResult = history[0].result;
      setAmountConverted(converting ? 0 : lastResult);
    }
  }, [converting]);

  useEffect(() => {
    didMount.current = true;
    dispatch(getCurrencies());
  }, []);

  const onChangeAmount = (event) => {
    setAmountConverted(0);
    setAmount(event.target.value);
  };

  const onSelectCurrencyFrom = (currency) => {
    setCurrencyFrom(currency);
  };

  const onSelectCurrencyTo = (currency) => {
    setCurrencyTo(currency);
  };

  const onConvert = (event) => {
    console.log(`selected ${event}`);
    debugger;
    dispatch(
      convertCurrency({
        from: currencyFrom,
        to: currencyTo,
        amount: ~~amount,
      })
    );
  };

  return (
    <>
      <Layout>
        <Header>Currency Converter</Header>
        <Layout>
          <Content>
            <Row>
              <Col span={12} offset={6}>
                <Row>
                  <Col span={10}>
                    <SelectCurrency
                      value={currencyFrom}
                      onChange={onSelectCurrencyFrom}
                      currencies={currencies}
                    />
                    <Input
                      placeholder="Set amount"
                      value={amount}
                      onChange={onChangeAmount}
                      type="number"
                      allowClear
                    />
                  </Col>
                  <Col span={2} className={styles.switchCurrenciesWrap}>
                    <span className={styles.switchCurrencies}>
                      <SwapOutlined />
                    </span>
                  </Col>
                  <Col span={10}>
                    <SelectCurrency
                      currencies={currencies}
                      value={currencyTo}
                      type="number"
                      onChange={onSelectCurrencyTo}
                    />
                    <Input disabled value={amountConverted} type="number" />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className={styles.converterButtonWrap}>
                    <Button
                      loading={converting}
                      disabled={disabled}
                      onClick={onConvert}
                    >
                      Convert
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Dashboard;
