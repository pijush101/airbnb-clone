import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
            <Header />
            <main style={{ flex: 1, width: '100%' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
