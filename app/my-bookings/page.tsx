import GuestServices from '../../components/GuestServices';
import PageShell from '../../components/PageShell';
export const metadata={title:'My Bookings | SNJ Group'};
export default function Page(){return <PageShell compact><GuestServices initial="bookings"/></PageShell>;}