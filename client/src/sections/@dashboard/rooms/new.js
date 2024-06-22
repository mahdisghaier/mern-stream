import { Helmet } from 'react-helmet-async';
import RoomCreateView from 'src/sections/@dashboard/rooms/view/room-create-view'; // Update import path

export default function RoomCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new room</title> {/* Update page title */}
      </Helmet>

      <RoomCreateView /> {/* Use RoomCreateView component */}
    </>
  );
}
