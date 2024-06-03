'use client';

// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
import { useMockedUser } from '@/app/(RSAdmin)/admin/hooks//use-mocked-user';
// _mock
import {
  _appFeatured,
  _appAuthors,
  _appInstalled,
  _appRelated,
  _appInvoices,
} from '@/_mock';
// components
import { useSettingsContext } from '@/app/(RSAdmin)/admin/common/settings';
// assets
import { SeoIllustration } from '@/app/(RSAdmin)/admin/assets/illustrations';
//
import AppWidget from '../app-widget';
import AppWelcome from '../app-welcome';
import AppFeatured from '../app-featured';
import AppNewInvoice from '../app-new-invoice';
import AppTopAuthors from '../app-top-authors';
import AppTopRelated from '../app-top-related';
import AppAreaInstalled from '../app-area-installed';
import AppWidgetSummary from '../app-widget-summary';
import AppCurrentDownload from '../app-current-download';
import AppTopInstalledCountries from '../app-top-installed-countries';
import { useAuthContext } from '@/app/(RSAdmin)/admin/auth/hooks';
import { useState } from 'react';
import { LoadingScreen } from '@/app/(RSAdmin)/admin/common/loading-screen';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { user } = useAuthContext();

  const theme = useTheme();
  const settings = useSettingsContext()

  const [loading, setLoading] = useState(false);


  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Grid container spacing={3}>
          

            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title="Total No Riders"
                percent={2.6}
                total={0}
                chart={{
                  series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title="Total No Drivers"
                percent={0.2}
                total={0}
                chart={{
                  colors: [theme.palette.info.light, theme.palette.info.main],
                  series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title="Total No Bookings"
                percent={-0.1}
                total={0}
                chart={{
                  colors: [
                    theme.palette.warning.light,
                    theme.palette.warning.main,
                  ],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={6} lg={4}>
              <AppCurrentDownload
                title="Current Download"
                chart={{
                  series: [
                    { label: 'Mac', value: 12244 },
                    { label: 'Window', value: 53345 },
                    { label: 'iOS', value: 44313 },
                    { label: 'Android', value: 78343 },
                  ],
                }}
              />
            </Grid>

            <Grid xs={12} md={6} lg={8}>
              <AppAreaInstalled
                title="Area Installed"
                subheader="(+43%) than last year"
                chart={{
                  categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  series: [
                    {
                      year: '2019',
                      data: [
                        {
                          name: 'Asia',
                          data: [
                            10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49,
                          ],
                        },
                        {
                          name: 'America',
                          data: [
                            10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77,
                          ],
                        },
                      ],
                    },
                    {
                      year: '2020',
                      data: [
                        {
                          name: 'Asia',
                          data: [
                            51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49,
                          ],
                        },
                        {
                          name: 'America',
                          data: [
                            56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77,
                          ],
                        },
                      ],
                    },
                  ],
                }}
              />
            </Grid>
 
          </Grid>
        </Container>
      )}
    </>
  );
}
