import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ShoppingBagOutlined } from '@mui/icons-material';

export interface TotalCustomersProps {
  diff?: number;
  trend: 'up' | 'down';
  value: string;
  title: string;
  icon?: React.ReactNode;
}

export default function CardStatisticsNumber({
  diff,
  trend,
  value,
  title,
  icon,
}: TotalCustomersProps): React.JSX.Element {
  return (
    <Card className="w-full h-full">
      <CardContent>
        <Stack spacing={2}>
          <Stack
            className="flex justify-between items-center w-full flex-row gap-3"
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography
                color="text.secondary"
                variant="overline"
              >
                {title}
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <Avatar className="bg-primary">{{ icon } ? icon : <ShoppingBagOutlined />}</Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
