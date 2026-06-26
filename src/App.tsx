/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="clothify-theme">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about-clothify-sustainable-fashion" element={<About />} />
            <Route path="premium-clothing-collection" element={<Products />} />
            <Route path="sustainable-fashion-blog" element={<Blog />} />
            <Route path="contact-clothify" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
