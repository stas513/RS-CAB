import PropTypes from 'prop-types';
import PassengerEditView from '../../components/view/passengers-edit-view'

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Passenger Edit',
};

export default function PassengerEditPage({ params }) {
  const { id } = params;

  return <PassengerEditView id={id} />;
}

PassengerEditPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
