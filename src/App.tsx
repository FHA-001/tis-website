import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Staff from './pages/Staff';
import Facilities from './pages/Facilities';
import Gallery from './pages/Gallery';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Management from './pages/Management';

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
  
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programs" element={<Programs />} />
          <Route path="staff" element={<Staff />} />
          <Route path="management" element={<Management />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
