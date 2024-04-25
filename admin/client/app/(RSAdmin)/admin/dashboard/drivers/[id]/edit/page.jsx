import PropTypes from 'prop-types';
import DriversEditView from '../../components/view/drivers-edit-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Driver Edit',
};

export default function DriverEditPage({ params }) {
  const { id } = params;

  return <DriversEditView id={id} />;
}

DriverEditPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
