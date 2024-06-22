import { Helmet } from 'react-helmet-async';

import  UserCreateView  from 'src/sections/@dashboard/user/view/user-create-view';
import UserEditView from './view/user-edit-view';

// ----------------------------------------------------------------------

export default function UserUpdatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: update user</title>
      </Helmet>

      <UserEditView />
    </>
  );
}
