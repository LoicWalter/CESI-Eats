import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { LatestOrders, CardStatisticsNumber, TotalProfit } from '@repo/ui';
import dayjs from 'dayjs';
import {
  CheckOutlined,
  ReceiptOutlined,
  RoomServiceOutlined,
  SummarizeOutlined,
} from '@mui/icons-material';

export default function page() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 py-8 md:px-0 px-8">
      <Grid
        container
        className="flex gap-2 flex-row justify-center items-center"
      >
        <Grid
          xl={2}
          lg={3}
          sm={5}
          xs={12}
        >
          <CardStatisticsNumber
            diff={16}
            trend="down"
            value="1.6k"
            title="Passation de commandes"
            icon={<SummarizeOutlined />}
          />
        </Grid>
        <Grid
          xl={2}
          lg={3}
          sm={5}
          xs={12}
        >
          <CardStatisticsNumber
            diff={16}
            trend="down"
            value="2.3k"
            title="Acceptation de commandes"
            icon={<CheckOutlined />}
          />
        </Grid>
        <Grid
          xl={2}
          lg={3}
          sm={5}
          xs={12}
        >
          <CardStatisticsNumber
            diff={16}
            trend="down"
            value="2.3k"
            title="Acquittement de livraison"
            icon={<RoomServiceOutlined />}
          />
        </Grid>
        <Grid
          xl={2}
          lg={3}
          sm={5}
          xs={12}
        >
          <TotalProfit
            value="$15k"
            title="Chiffre d'affaires global"
            icon={<ReceiptOutlined />}
          />
        </Grid>
      </Grid>
      <Grid className="w-5/6 h-full flex flex-row gap-4 justify-center items-center">
        <LatestOrders
          title="Dernières commandes"
          orders={[
            {
              id: 'ORD-007',
              customer: { name: 'Ekaterina Tankova' },
              amount: 30.5,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-006',
              customer: { name: 'Cao Yu' },
              amount: 25.1,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-004',
              customer: { name: 'Alexa Richardson' },
              amount: 10.99,
              status: 'refunded',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-003',
              customer: { name: 'Anje Keizer' },
              amount: 96.43,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-002',
              customer: { name: 'Clarke Gillebert' },
              amount: 32.54,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-001',
              customer: { name: 'Adam Denisov' },
              amount: 16.76,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
        />
      </Grid>
    </div>
  );
}
