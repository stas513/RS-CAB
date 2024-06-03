import { UserEditView } from '../../components/view'


export const metadata = {
  title: 'Dashboard: User Edit',
};

export default function UserEditPage({ params }) {
  const { id } = params;

  return <UserEditView id={id} />;
}
