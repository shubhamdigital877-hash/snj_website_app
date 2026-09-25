import GuestServices from '../../components/GuestServices';
import PageShell from '../../components/PageShell';
export const metadata={title:'Profile | SNJ Group'};
export default function Page(){return <PageShell compact><GuestServices initial="login" profile/></PageShell>;}