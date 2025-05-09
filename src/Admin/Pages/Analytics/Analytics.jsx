import { Grid, makeStyles, MenuItem, Paper, Select, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Styles from './Styles';
import Layout from 'Components/Layout';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  ...Styles(theme),
  container: {
    padding: '32px 50px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 24,
    marginBottom: 32,
  },
  statCard: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid rgba(0, 0, 0, 0.23)",
    boxShadow: "none",
    '&:hover $statValue': {
      color: "#f4d45f",
    },
  },
  chartContainer: {
    marginBottom: 32,
    padding: 24,
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid rgba(0, 0, 0, 0.23)",
    boxShadow: "none",
  },
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleFilter: {
    minWidth: 150,
    height: 40,
  },
  chartWrapper: {
    width: '100%',
    height: 400,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 8,
    color: "#FBE281",
  },
  statLabel: {
    color: theme.palette.text.secondary,
  }
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Analytics() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [selectedRole, setSelectedRole] = useState('super-admin');
  const [userStats, setUserStats] = useState([]);
  const [subscriptionStats, setSubscriptionStats] = useState([]);

  useEffect(() => {
    // Fetch user analytics
    const fetchUserAnalytics = async () => {
      try {
        const data = await axios.get(
          `/stats/user${selectedRole !== 'all' ? `?role=${selectedRole}` : ''}`
        );
        console.log(data.data)
        setUserStats(data.data.data);
      } catch (error) {
        console.error('Error fetching user analytics:', error);
      }
    };

    // Fetch subscription analytics
    const fetchSubscriptionAnalytics = async () => {
      try {
        const data = await axios.get('/stats/subscriptions');
        setSubscriptionStats(data.data.data);
      } catch (error) {
        console.error('Error fetching subscription analytics:', error);
      }
    };

    fetchUserAnalytics();
    fetchSubscriptionAnalytics();
  }, [selectedRole]);

  const totalUsers = userStats.reduce((acc, curr) => acc + curr.count, 0);
  const totalSubscriptions = subscriptionStats.subscriptions?.reduce((acc, curr) => acc + curr.count, 0) ?? 0;
  const totalRevenue = subscriptionStats.revenue;

  return (
    <Layout>
      <div className={classes.container} style={{marginTop: 72}}>
        <div className={classes.header}>
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            Analytics Dashboard
          </Typography>
        </div>

        {/* Stats Cards */}
        <div className={classes.statsGrid}>
          <Paper className={classes.statCard}>
            <Typography className={classes.statValue}>{totalUsers}</Typography>
            <Typography className={classes.statLabel}>Total Users</Typography>
          </Paper>
          <Paper className={classes.statCard}>
            <Typography className={classes.statValue}>{totalSubscriptions}</Typography>
            <Typography className={classes.statLabel}>Active Subscriptions</Typography>
          </Paper>
          <Paper className={classes.statCard}>
            <Typography className={classes.statValue}>${totalRevenue}</Typography>
            <Typography className={classes.statLabel}>Total Revenue</Typography>
          </Paper>
        </div>

        {/* User Analytics */}
        <Paper className={classes.chartContainer}>
          <div className={classes.chartHeader}>
            <Typography variant="h6">User Growth</Typography>
            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              variant="outlined"
              size="small"
              className={classes.roleFilter}
            >
              <MenuItem value="all">All Roles</MenuItem>
              <MenuItem value="super-admin">Super Admin</MenuItem>
              <MenuItem value="customer-admin">Customer Admin</MenuItem>
              <MenuItem value="customer-viewer">Customer Viewer</MenuItem>
            </Select>
          </div>
          <div className={classes.chartWrapper}>
            <ResponsiveContainer>
              <LineChart data={userStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="joinedDate" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={'#FBE281'}
                  name="Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Paper>

        {/* Subscription Analytics */}
        <Paper className={classes.chartContainer}>
          <Typography variant="h6" gutterBottom>
            Subscription Distribution
          </Typography>
          <div className={classes.chartWrapper}>
            <ResponsiveContainer>
              <BarChart data={subscriptionStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="planName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="count"
                  fill={'#FBE281'}
                  name="Subscriptions"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </div>
    </Layout>
  );
}

export default Analytics;
