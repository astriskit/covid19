import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { message, Button, Card, Table, Alert } from "antd";
import { useHistory } from "react-router-dom";
import { LogoutOutlined, ReloadOutlined } from "@ant-design/icons";
import { loadFromApi } from "../store/covid-actions";
import { logout } from "../store/user-actions";

const render = (num) => num.toLocaleString();

const columns = [
  {
    dataIndex: "state",
    title: "Particulars",
    key: "state",
    fixed: "left",
    sorter: (a, b) => a.state > b.state,
    defaultSortOrder: "ascend",
  },
  {
    dataIndex: "todayCases",
    title: "Total (today)",
    key: "cases-today",
    sorter: (a, b) => a.todayCases - b.todayCases,
    responsive: ["lg"],
    render,
  },
  {
    dataIndex: "todayActive",
    title: "Active (today)",
    key: "active-today",
    sorter: (a, b) => a.todayActive - b.todayActive,
    responsive: ["lg"],
    render,
  },
  {
    dataIndex: "todayDeaths",
    title: "Deaths (today)",
    key: "death-today",
    sorter: (a, b) => a.todayDeaths - b.todayDeaths,
    responsive: ["lg"],
    render,
  },
  {
    dataIndex: "todayRecovered",
    title: "Recovered (today)",
    key: "recovered-today",
    sorter: (a, b) => a.todayRecovered - b.todayRecovered,
    responsive: ["lg"],
    render,
  },
  {
    dataIndex: "cases",
    title: "Total",
    key: "cases-till",
    sorter: (a, b) => a.cases - b.cases,
    render,
  },
  {
    dataIndex: "active",
    title: "Active",
    key: "active-till",
    sorter: (a, b) => a.active - b.active,
    responsive: ["md"],
    render,
  },
  {
    dataIndex: "deaths",
    title: "Deaths",
    key: "death-till",
    sorter: (a, b) => a.deaths - b.deaths,
    render,
  },
  {
    dataIndex: "recovered",
    title: "Recovered",
    key: "recovered-till",
    sorter: (a, b) => a.recovered - b.recovered,
    render,
  },
];

const HomeView = ({ data = {}, loading = false, onRefresh, onLogout }) => {
  const history = useHistory();
  useEffect(() => {
    handleRefresh();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.info(data, loading);
  }, [data, loading]);

  const onLogoutFail = (err) => {
    message.error(err.message || "Logout failed");
  };

  const onLogoutSuccess = () => {
    message.success("User logged out");
    history.push("/login-signup");
  };

  const handleLogout = () => {
    onLogout({
      onFail: onLogoutFail,
      onSuccess: onLogoutSuccess,
    });
  };

  const handleRefresh = () => {
    onRefresh({
      onFail: (err) => {
        message.error(err.message);
      },
    });
  };

  const lastUpdated = data?.updated ? new Date(data.updated) : "";
  const title = () => (
    <div>
      <h2>Data for covid-19 cases in India</h2>
      {lastUpdated && (
        <h5>{`(last-updated on ${lastUpdated.toLocaleDateString()})`}</h5>
      )}
    </div>
  );
  const tableData =
    data?.states && data?.total
      ? [...data.states, { ...data.total, state: "Total (all states)" }]
      : [];

  return (
    <Card
      loading={loading}
      title={title()}
      extra={[
        <Button
          size="small"
          onClick={handleRefresh}
          icon={<ReloadOutlined />}
          disabled={loading}
          data-cy="refresh"
          key="refresh"
          title="reload data"
          style={{ marginRight: "10px" }}
        />,
        <Button
          size="small"
          data-cy="logout"
          onClick={handleLogout}
          type="primary"
          loading={loading}
          icon={<LogoutOutlined />}
          key="logout"
          title="logout"
        />,
      ]}
    >
      <Table
        footer={() => (
          <Alert
            type="info"
            message={
              <div style={{ textAlign: "center" }}>
                Data-source:{" "}
                <a href="https://disease.sh/v3/covid-19/gov/IN">disease.sh</a>
              </div>
            }
          />
        )}
        dataSource={tableData}
        columns={columns}
        pagination={false}
        rowKey={(r) => r.state}
        bordered
      />
    </Card>
  );
};

HomeView.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = ({ covid = {} }) => ({ ...covid });
const mapPropsToDispatch = (dispatch) => ({
  onRefresh: (payload) => dispatch(loadFromApi(payload)),
  onLogout: (payload) => dispatch(logout(payload)),
});

const Home = connect(mapStateToProps, mapPropsToDispatch)(HomeView);
export default Home;
