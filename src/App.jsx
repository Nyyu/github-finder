import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Alert from "./Components/Layout/Alert";

// Page components
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Users from "./Components/Pages/Users";
import NotFound from "./Components/Pages/NotFound";

// Context
import { GithubProvicer } from "./Context/github/GithubContext";
import { AlertProvider } from "./Context/Alert/AlertContext";

function App() {
    return (
        <GithubProvicer>
            <AlertProvider>
                <Router>
                    <div className="flex flex-col justify-between h-screen">
                        <Navbar />
                        <main className="container mx-auto px-3 pb-12">
                            <Alert />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route
                                    path="/user/:login"
                                    element={<Users />}
                                />

                                <Route path="/*" element={<NotFound />} />
                                <Route
                                    path="/notfound"
                                    element={<NotFound />}
                                />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </AlertProvider>
        </GithubProvicer>
    );
}

export default App;
