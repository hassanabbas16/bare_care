import {getServerSession} from "next-auth";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

export default async function RootLayout({ children }) {
    const session = await getServerSession();

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <div style={{ flex: "1" }}>
                {children}
            </div>
            <Footer />
        </div>
    );
}