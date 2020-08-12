import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Layout, Input, Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';

import { getCurrencies, convertCurrency } from 'src/store/actions/currencies';
import SelectCurrency from 'src/components/SelectCurrency';
import HistoryTable from 'src/components/HistoryTable';
import styles from './styles.module.less';

const { Content } = Layout;

function Dashboard() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.currencies.loading);
  const converting = useSelector((state) => state.currencies.converting);
  const currencies = useSelector((state) => state.currencies.currencies);
  const history = useSelector((state) => state.currencies.history);
  const didMount = useRef(false);

  const [amount, setAmount] = useState(0);
  const [amountConverted, setAmountConverted] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState(currencies[0]?.key);
  const [currencyTo, setCurrencyTo] = useState(currencies[1]?.key);

  const disabled = amount <= 0;

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
    dispatch(
      convertCurrency({
        from: currencyFrom,
        to: currencyTo,
        amount: ~~amount,
      })
    );
  };

  const onSwapCurrencies = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
    setAmount(amountConverted);
    setAmountConverted(amount);
  };

  return (
    <>
      <Layout className={styles.wrap}>
        <Content>
          <Row gutter={[15, 15]}>
            <Col span={24} xl={12}>
              {loading && <div className={styles.loading}>loading...</div>}
              {!loading && (
                <>
                  <Row>
                    <Col span={11}>
                      <SelectCurrency
                        placeholder="Select currency from"
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
                      <span
                        className={styles.switchCurrencies}
                        onClick={onSwapCurrencies}
                      >
                        <SwapOutlined />
                      </span>
                    </Col>
                    <Col span={11}>
                      <SelectCurrency
                        placeholder="Select currency to"
                        currencies={currencies}
                        value={currencyTo}
                        onChange={onSelectCurrencyTo}
                      />
                      <Input disabled value={amountConverted} type="number" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className={styles.converterButtonWrap}>
                      <Button
                        type="primary"
                        loading={converting}
                        disabled={disabled}
                        onClick={onConvert}
                      >
                        Convert
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </Col>
            <Col span={24} xl={12}>
              <HistoryTable dataSource={history} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default Dashboard;
