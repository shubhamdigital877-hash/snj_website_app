import Link from 'next/link';
export default function PageShell({children,compact=false}:{children:React.ReactNode;compact?:boolean}){return <main id="main-content" tabIndex={-1} className={'content-page '+(compact?'compact-page':'')}><Link href="/" className="breadcrumb">Home / SNJ Collection</Link>{children}</main>;}
