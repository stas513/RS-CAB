import { useMemo } from 'react';
// routes
import { paths } from '@/app/(RSAdmin)/admin/routes/paths';
// locales
import { useLocales } from '@/app/(RSAdmin)/admin/locales';
// components
import Label from '@/app/(RSAdmin)/admin/common/label';
import Iconify from '@/app/(RSAdmin)/admin/common/iconify';
import SvgColor from '@/app/(RSAdmin)/admin/common/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      {
        subheader: t('dashboard'),
        items: [
          {
            title: t('app'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },

          // Drivers
          {
            title: t('Drivers'),
            path: paths.dashboard.drivers.root,
            icon: ICONS.label,
            children: [
              { title: t('list'), path: paths.dashboard.drivers.list },
            ],
          },
          // Passengers
          {
            title: t('Passengers'),
            path: paths.dashboard.passengers.root,
            icon: ICONS.user,
            children: [
              { title: t('list'), path: paths.dashboard.passengers.list },

            ],
          },

          // Bookings
          {
            title: t('booking'),
            path: paths.dashboard.bookings.root,
            icon: ICONS.job,
            children: [
              { title: t('list'), path: paths.dashboard.bookings.list },
              { title: t('create'), path: paths.dashboard.bookings.new },

            ],
          },
          // USER
          {
            title: t('user'),
            path: paths.dashboard.user.root,
            icon: ICONS.user,
            children: [
              { title: t('list'), path: paths.dashboard.user.list },
              { title: t('create'), path: paths.dashboard.user.new },
              // { title: t('account'), path: paths.dashboard.user.account },
            ],
          },
          // Packages
          {
            title: t('packages'),
            path: paths.dashboard.packages.root,
            icon: ICONS.user,
            children: [
              { title: t('list'), path: paths.dashboard.packages.list },
              { title: t('create'), path: paths.dashboard.packages.new },
            ],
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
