'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import LinearProgress from '@mui/material/LinearProgress';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CampaignIcon from '@mui/icons-material/Campaign';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Mock analytics data
const overviewStats = [
  {
    label: 'Total Users',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: PeopleIcon,
    color: '#2196F3',
    description: 'vs last month',
  },
  {
    label: 'Total Concerns',
    value: '1,490',
    change: '+8.2%',
    trend: 'up',
    icon: ReportProblemIcon,
    color: '#FF9800',
    description: 'vs last month',
  },
  {
    label: 'Announcements',
    value: '156',
    change: '+3.1%',
    trend: 'up',
    icon: CampaignIcon,
    color: '#7B1113',
    description: 'vs last month',
  },
  {
    label: 'Suggestions',
    value: '892',
    change: '+15.4%',
    trend: 'up',
    icon: LightbulbIcon,
    color: '#4CAF50',
    description: 'vs last month',
  },
];

// Concerns by category
const concernsByCategory = [
  { category: 'Infrastructure', count: 425, percentage: 28.5, color: '#2196F3' },
  { category: 'Public Safety', count: 312, percentage: 20.9, color: '#F44336' },
  { category: 'Sanitation', count: 287, percentage: 19.3, color: '#4CAF50' },
  { category: 'Utilities', count: 198, percentage: 13.3, color: '#FF9800' },
  { category: 'Noise', count: 156, percentage: 10.5, color: '#9C27B0' },
  { category: 'Traffic', count: 72, percentage: 4.8, color: '#00BCD4' },
  { category: 'Other', count: 40, percentage: 2.7, color: '#71767b' },
];

// Concerns by district
const concernsByDistrict = [
  { district: 'Area 5', count: 187, percentage: 12.6 },
  { district: 'Area 3', count: 156, percentage: 10.5 },
  { district: 'Area 12', count: 143, percentage: 9.6 },
  { district: 'Area 7', count: 128, percentage: 8.6 },
  { district: 'Area 1', count: 115, percentage: 7.7 },
  { district: 'Area 8', count: 98, percentage: 6.6 },
  { district: 'Area 15', count: 92, percentage: 6.2 },
  { district: 'Area 2', count: 87, percentage: 5.8 },
];

// Monthly trends (last 6 months)
const monthlyTrends = [
  { month: 'Jul', concerns: 198, resolved: 156, users: 2102 },
  { month: 'Aug', concerns: 234, resolved: 198, users: 2245 },
  { month: 'Sep', concerns: 267, resolved: 234, users: 2398 },
  { month: 'Oct', concerns: 289, resolved: 256, users: 2567 },
  { month: 'Nov', concerns: 312, resolved: 287, users: 2712 },
  { month: 'Dec', concerns: 190, resolved: 114, users: 2847 },
];

// Resolution metrics
const resolutionMetrics = {
  averageTime: '3.2 days',
  resolvedThisMonth: 287,
  pendingConcerns: 156,
  satisfactionRate: '92%',
};

// User activity
const userActivity = {
  activeToday: 423,
  activeThisWeek: 1245,
  newThisMonth: 287,
  totalVerified: 2534,
};

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  // Calculate max for bar chart scaling
  const maxConcernCount = Math.max(...concernsByCategory.map(c => c.count));
  const maxDistrictCount = Math.max(...concernsByDistrict.map(d => d.count));

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(12px)',
          zIndex: 100,
          borderBottom: '1px solid #2f3336',
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
              Analytics
            </Typography>
            <FormControl size="small">
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                sx={{
                  color: '#e7e9ea',
                  fontSize: '0.875rem',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: '#2f3336' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#71767b' },
                  '.MuiSvgIcon-root': { color: '#71767b' },
                }}
              >
                <MenuItem value="7d">Last 7 days</MenuItem>
                <MenuItem value="30d">Last 30 days</MenuItem>
                <MenuItem value="90d">Last 90 days</MenuItem>
                <MenuItem value="1y">Last year</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Overview Stats */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            mb: 3,
          }}
        >
          {overviewStats.map((stat, index) => (
            <Card
              key={index}
              sx={{
                bgcolor: '#16181c',
                borderRadius: 3,
                p: 2,
                border: '1px solid #2f3336',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: `${stat.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <stat.icon sx={{ color: stat.color, fontSize: 22 }} />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: stat.trend === 'up' ? '#4CAF50' : '#F44336',
                  }}
                >
                  {stat.trend === 'up' ? (
                    <TrendingUpIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: 16 }} />
                  )}
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
                    {stat.change}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ color: '#71767b', fontSize: '0.813rem', mb: 0.5 }}>
                {stat.label}
              </Typography>
              <Typography sx={{ color: '#e7e9ea', fontSize: '1.5rem', fontWeight: 700 }}>
                {stat.value}
              </Typography>
              <Typography sx={{ color: '#71767b', fontSize: '0.7rem' }}>
                {stat.description}
              </Typography>
            </Card>
          ))}
        </Box>

        {/* Resolution Metrics */}
        <Card
          sx={{
            bgcolor: '#16181c',
            borderRadius: 3,
            p: 2,
            border: '1px solid #2f3336',
            mb: 3,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#e7e9ea', mb: 2 }}>
            Resolution Performance
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}
          >
            <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: '#202327', borderRadius: 2 }}>
              <AccessTimeIcon sx={{ color: '#2196F3', fontSize: 28, mb: 0.5 }} />
              <Typography sx={{ color: '#e7e9ea', fontSize: '1.25rem', fontWeight: 700 }}>
                {resolutionMetrics.averageTime}
              </Typography>
              <Typography sx={{ color: '#71767b', fontSize: '0.75rem' }}>
                Avg. Resolution Time
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: '#202327', borderRadius: 2 }}>
              <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 28, mb: 0.5 }} />
              <Typography sx={{ color: '#e7e9ea', fontSize: '1.25rem', fontWeight: 700 }}>
                {resolutionMetrics.resolvedThisMonth}
              </Typography>
              <Typography sx={{ color: '#71767b', fontSize: '0.75rem' }}>
                Resolved This Month
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: '#202327', borderRadius: 2 }}>
              <ReportProblemIcon sx={{ color: '#FF9800', fontSize: 28, mb: 0.5 }} />
              <Typography sx={{ color: '#e7e9ea', fontSize: '1.25rem', fontWeight: 700 }}>
                {resolutionMetrics.pendingConcerns}
              </Typography>
              <Typography sx={{ color: '#71767b', fontSize: '0.75rem' }}>
                Pending Concerns
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: '#202327', borderRadius: 2 }}>
              <Box sx={{ fontSize: 28, mb: 0.5 }}>😊</Box>
              <Typography sx={{ color: '#e7e9ea', fontSize: '1.25rem', fontWeight: 700 }}>
                {resolutionMetrics.satisfactionRate}
              </Typography>
              <Typography sx={{ color: '#71767b', fontSize: '0.75rem' }}>
                Satisfaction Rate
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Concerns by Category */}
        <Card
          sx={{
            bgcolor: '#16181c',
            borderRadius: 3,
            p: 2,
            border: '1px solid #2f3336',
            mb: 3,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#e7e9ea', mb: 2 }}>
            Concerns by Category
          </Typography>
          {concernsByCategory.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.875rem', color: '#e7e9ea' }}>
                  {item.category}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#71767b' }}>
                  {item.count} ({item.percentage}%)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(item.count / maxConcernCount) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#2f3336',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: item.color,
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          ))}
        </Card>

        {/* Concerns by District */}
        <Card
          sx={{
            bgcolor: '#16181c',
            borderRadius: 3,
            p: 2,
            border: '1px solid #2f3336',
            mb: 3,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#e7e9ea', mb: 2 }}>
            Top Districts by Concerns
          </Typography>
          {concernsByDistrict.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationOnIcon sx={{ fontSize: 16, color: '#7B1113' }} />
                  <Typography sx={{ fontSize: '0.875rem', color: '#e7e9ea' }}>
                    {item.district}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.875rem', color: '#71767b' }}>
                  {item.count} ({item.percentage}%)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(item.count / maxDistrictCount) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#2f3336',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#7B1113',
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          ))}
        </Card>

        {/* User Activity */}
        <Card
          sx={{
            bgcolor: '#16181c',
            borderRadius: 3,
            p: 2,
            border: '1px solid #2f3336',
            mb: 3,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#e7e9ea', mb: 2 }}>
            User Activity
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}
          >
            <Box sx={{ p: 1.5, bgcolor: '#202327', borderRadius: 2 }}>
              <Typography sx={{ color: '#e7e9ea', fontSize: '1.5rem', fontWeight: 700 }}>
                {userActivity.activeToday}
              </Typography>
              <Typography sx={{ color: '#71767b', fontSize: '0.75rem' }}>
                Active Today
              </Typography>
            </Box>
            <Box sx={{ p: 1.5, bgcolor: '#202327', borderRadius: 2 }}>
              <Typography sx={{ color: '#e7e9ea', fontSize: '1.5rem', fontWeight: 700 }}>
                {userActivity.activeThisWeek.toLocaleString()}
              </Typography>
              <Typography sx={{ color: '#71767b', fontSize: '0.75rem' }}>
                Active This Week
              </Typography>
            </Box>
            <Box sx={{ p: 1.5, bgcolor: '#202327', borderRadius: 2 }}>
              <Typography sx={{ color: '#e7e9ea', fontSize: '1.5rem', fontWeight: 700 }}>
                {userActivity.newThisMonth}
              </Typography>
              <Typography sx={{ color: '#71767b', fontSize: '0.75rem' }}>
                New This Month
              </Typography>
            </Box>
            <Box sx={{ p: 1.5, bgcolor: '#202327', borderRadius: 2 }}>
              <Typography sx={{ color: '#e7e9ea', fontSize: '1.5rem', fontWeight: 700 }}>
                {userActivity.totalVerified.toLocaleString()}
              </Typography>
              <Typography sx={{ color: '#71767b', fontSize: '0.75rem' }}>
                Verified Users
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Monthly Trend */}
        <Card
          sx={{
            bgcolor: '#16181c',
            borderRadius: 3,
            p: 2,
            border: '1px solid #2f3336',
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#e7e9ea', mb: 2 }}>
            Monthly Trends
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {monthlyTrends.map((month, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1,
                  bgcolor: '#202327',
                  borderRadius: 2,
                }}
              >
                <Typography sx={{ width: 40, fontSize: '0.875rem', color: '#71767b', fontWeight: 600 }}>
                  {month.month}
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#FF9800' }} />
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                        {month.concerns} concerns
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4CAF50' }} />
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                        {month.resolved} resolved
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#2196F3' }} />
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                        {month.users.toLocaleString()} users
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
