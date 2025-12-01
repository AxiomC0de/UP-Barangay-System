'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CampaignIcon from '@mui/icons-material/Campaign';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useRouter } from 'next/navigation';

// Mock statistics data
const stats = [
  {
    label: 'Total Users',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: PeopleIcon,
    color: '#2196F3',
  },
  {
    label: 'Open Concerns',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: ReportProblemIcon,
    color: '#FF9800',
  },
  {
    label: 'Announcements',
    value: '48',
    change: '+3.1%',
    trend: 'up',
    icon: CampaignIcon,
    color: '#7B1113',
  },
  {
    label: 'Suggestions',
    value: '324',
    change: '-2.4%',
    trend: 'down',
    icon: LightbulbIcon,
    color: '#4CAF50',
  },
];

// Mock recent concerns
const recentConcerns = [
  {
    id: 1,
    title: 'Streetlight malfunction in Area 5',
    author: 'Maria Santos',
    avatar: null,
    status: 'open',
    priority: 'high',
    time: '10 minutes ago',
    category: 'Infrastructure',
  },
  {
    id: 2,
    title: 'Stray dogs near the covered court',
    author: 'Juan Dela Cruz',
    avatar: null,
    status: 'in_progress',
    priority: 'medium',
    time: '25 minutes ago',
    category: 'Public Safety',
  },
  {
    id: 3,
    title: 'Garbage collection schedule inquiry',
    author: 'Ana Reyes',
    avatar: null,
    status: 'open',
    priority: 'low',
    time: '1 hour ago',
    category: 'Sanitation',
  },
  {
    id: 4,
    title: 'Noise complaint - Area 12 construction',
    author: 'Pedro Garcia',
    avatar: null,
    status: 'open',
    priority: 'urgent',
    time: '2 hours ago',
    category: 'Noise',
  },
];

// Mock recent users
const recentUsers = [
  {
    id: 1,
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    district: 'Area 5',
    status: 'verified',
    joinedAt: '2 hours ago',
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    email: 'carlos.m@email.com',
    district: 'Area 12',
    status: 'pending',
    joinedAt: '5 hours ago',
  },
  {
    id: 3,
    name: 'Elena Cruz',
    email: 'elena.cruz@email.com',
    district: 'Area 3',
    status: 'verified',
    joinedAt: '1 day ago',
  },
];

// Concern resolution stats
const resolutionStats = {
  resolved: 1245,
  inProgress: 156,
  open: 89,
  total: 1490,
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return '#2196F3';
    case 'in_progress':
      return '#FF9800';
    case 'resolved':
      return '#4CAF50';
    default:
      return '#71767b';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'open':
      return 'Open';
    case 'in_progress':
      return 'In Progress';
    case 'resolved':
      return 'Resolved';
    default:
      return status;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return '#F44336';
    case 'high':
      return '#FF9800';
    case 'medium':
      return '#FFC107';
    case 'low':
      return '#4CAF50';
    default:
      return '#71767b';
  }
};

export default function AdminOverviewPage() {
  const router = useRouter();

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
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                Overview
              </Typography>
              <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                System statistics and activity
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                sx={{
                  color: '#e7e9ea',
                  '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Stats Grid */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            mb: 3,
          }}
        >
          {stats.map((stat, index) => (
            <Card
              key={index}
              sx={{
                bgcolor: '#16181c',
                borderRadius: 3,
                p: 2,
                border: '1px solid #2f3336',
                '&:hover': {
                  borderColor: '#3f4347',
                },
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
            </Card>
          ))}
        </Box>

        {/* Concern Resolution Progress */}
        <Card
          sx={{
            bgcolor: '#16181c',
            borderRadius: 3,
            p: 2,
            border: '1px solid #2f3336',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#e7e9ea' }}>
              Concern Resolution
            </Typography>
            <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
              This Month
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: '0.875rem', color: '#e7e9ea' }}>
                {resolutionStats.resolved} of {resolutionStats.total} resolved
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', color: '#4CAF50', fontWeight: 600 }}>
                {((resolutionStats.resolved / resolutionStats.total) * 100).toFixed(1)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(resolutionStats.resolved / resolutionStats.total) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: '#2f3336',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#4CAF50',
                  borderRadius: 4,
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4CAF50' }} />
              <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                Resolved ({resolutionStats.resolved})
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#FF9800' }} />
              <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                In Progress ({resolutionStats.inProgress})
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#2196F3' }} />
              <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                Open ({resolutionStats.open})
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Quick Actions */}
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
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => router.push('/admin_dashboard/announcements')}
              sx={{
                bgcolor: '#7B1113',
                color: '#fff',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': { bgcolor: '#9B1315' },
              }}
            >
              New Announcement
            </Button>
            <Button
              variant="outlined"
              startIcon={<ReportProblemIcon />}
              onClick={() => router.push('/admin_dashboard/concerns')}
              sx={{
                borderColor: '#2f3336',
                color: '#e7e9ea',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': { borderColor: '#71767b', bgcolor: 'rgba(231, 233, 234, 0.1)' },
              }}
            >
              View Concerns
            </Button>
            <Button
              variant="outlined"
              startIcon={<PeopleIcon />}
              onClick={() => router.push('/admin_dashboard/users')}
              sx={{
                borderColor: '#2f3336',
                color: '#e7e9ea',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': { borderColor: '#71767b', bgcolor: 'rgba(231, 233, 234, 0.1)' },
              }}
            >
              Manage Users
            </Button>
          </Box>
        </Card>

        {/* Recent Concerns */}
        <Card
          sx={{
            bgcolor: '#16181c',
            borderRadius: 3,
            border: '1px solid #2f3336',
            mb: 3,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#e7e9ea' }}>
              Recent Concerns
            </Typography>
            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={() => router.push('/admin_dashboard/concerns')}
              sx={{
                color: '#7B1113',
                textTransform: 'none',
                fontSize: '0.875rem',
                '&:hover': { bgcolor: 'rgba(123, 17, 19, 0.1)' },
              }}
            >
              View All
            </Button>
          </Box>

          {recentConcerns.map((concern, index) => (
            <Box
              key={concern.id}
              sx={{
                px: 2,
                py: 1.5,
                borderTop: '1px solid #2f3336',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.03)' },
              }}
            >
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: '#2f3336',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  {concern.author.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#e7e9ea' }}>
                      {concern.author}
                    </Typography>
                    <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                      · {concern.time}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: '#e7e9ea',
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {concern.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Chip
                      label={getStatusLabel(concern.status)}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: '0.7rem',
                        bgcolor: `${getStatusColor(concern.status)}20`,
                        color: getStatusColor(concern.status),
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      label={concern.priority.charAt(0).toUpperCase() + concern.priority.slice(1)}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: '0.7rem',
                        bgcolor: `${getPriorityColor(concern.priority)}20`,
                        color: getPriorityColor(concern.priority),
                        fontWeight: 600,
                      }}
                    />
                    <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                      {concern.category}
                    </Typography>
                  </Box>
                </Box>
                <IconButton size="small" sx={{ color: '#71767b' }}>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Card>

        {/* Recent Users */}
        <Card
          sx={{
            bgcolor: '#16181c',
            borderRadius: 3,
            border: '1px solid #2f3336',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#e7e9ea' }}>
              Recent Users
            </Typography>
            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={() => router.push('/admin_dashboard/users')}
              sx={{
                color: '#7B1113',
                textTransform: 'none',
                fontSize: '0.875rem',
                '&:hover': { bgcolor: 'rgba(123, 17, 19, 0.1)' },
              }}
            >
              View All
            </Button>
          </Box>

          {recentUsers.map((user) => (
            <Box
              key={user.id}
              sx={{
                px: 2,
                py: 1.5,
                borderTop: '1px solid #2f3336',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.03)' },
              }}
            >
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#7B1113',
                    fontSize: '0.938rem',
                    fontWeight: 600,
                  }}
                >
                  {user.name.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#e7e9ea' }}>
                      {user.name}
                    </Typography>
                    {user.status === 'verified' ? (
                      <CheckCircleIcon sx={{ fontSize: 16, color: '#4CAF50' }} />
                    ) : (
                      <PendingIcon sx={{ fontSize: 16, color: '#FF9800' }} />
                    )}
                  </Box>
                  <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                    {user.email}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                    {user.district}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                    {user.joinedAt}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Card>
      </Box>
    </Box>
  );
}
