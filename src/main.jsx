import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Home.jsx'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const ClutchPage = lazy(() => import('./ClutchPage.jsx'));
const ChallengePage = lazy(() => import('./ChallengePage.jsx'));
const TeamPage = lazy(() => import('./TeamPage.jsx'));
const VehiclesPage = lazy(() => import('./VehiclesPage.jsx'));
const CompetitionsPage = lazy(() => import('./CompetitionsPage.jsx'));
const ResearchPage = lazy(() => import('./ResearchPage.jsx'));
const OutreachPage = lazy(() => import('./OutreachPage.jsx'));
const SponsorsPage = lazy(() => import('./SponsorsPage.jsx'));
const ContactPage = lazy(() => import('./ContactPage.jsx'));
const JoinUsPage = lazy(() => import('./JoinUsPage.jsx'));
const GamePage = lazy(() => import('./GamePage.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          {/* <Route path="kevin" element={<KevinPage />} /> */}
          {/* <Route path="hydra" element={<HydraPage />} /> */}
          <Route path="clutch" element={<ClutchPage />} />
          <Route path="challenge" element={<ChallengePage />} />
          {/* <Route path="kraken" element={<KrakenPage />} /> */}
          <Route path="team" element={<TeamPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="competitions" element={<CompetitionsPage />} />
          <Route path="research" element={<ResearchPage />} />
          <Route path="outreach" element={<OutreachPage />} />
          <Route path="sponsors" element={<SponsorsPage />} />
          <Route path="contact" element={<ContactPage />} />
          {/* <Route path="lucy" element={<LucyPage />} /> */}
          {/* <Route path="focus" element={<FocusPage />} /> */}
          {/* <Route path="robosub2025" element={<Robosub2025Page />} /> */}
          {/* <Route path="robosub2026" element={<Robosub2026Page />} /> */}
          {/* <Route path="robosub2026hydramechanical" element={<RoboSub2026SubsystemPage vehicleId="hydra" subsystemId="mechanical" />} /> */}
          {/* <Route path="hydra/mechanical" element={<RoboSub2026SubsystemPage vehicleId="hydra" subsystemId="mechanical" />} />
          <Route path="hydra/electrical" element={<RoboSub2026SubsystemPage vehicleId="hydra" subsystemId="electrical" />} />
          <Route path="hydra/software" element={<RoboSub2026SubsystemPage vehicleId="hydra" subsystemId="software" />} />
          <Route path="kraken/mechanical" element={<RoboSub2026SubsystemPage vehicleId="kraken" subsystemId="mechanical" />} />
          <Route path="kraken/electrical" element={<RoboSub2026SubsystemPage vehicleId="kraken" subsystemId="electrical" />} />
          <Route path="kraken/software" element={<RoboSub2026SubsystemPage vehicleId="kraken" subsystemId="software" />} />
          <Route path="sauvc2025" element={<Sauvc2025Page />} />
          <Route path="sauvc2026" element={<Sauvc2026Page />} />
          <Route path="materov2024" element={<Materov2024Page />} />
          <Route path="sauvc2024" element={<Sauvc2024Page />} />
          <Route path="3dpen" element={<Pen3DPage />} />
          <Route path="yyss" element={<YYSSPage />} />
          <Route path="marinevehicle" element={<MarineVehiclePage />} />
          <Route path="computervision" element={<ComputerVisionPage />} />
          <Route path="blender3d" element={<Blender3DPage />} /> */}
          <Route path="joinus" element={<JoinUsPage />} />
          <Route path="game" element={<GamePage />} />
          {/* <Route path="blog" element={<TeamBlogPage />} />
          <Route path="blog/:slug" element={<TeamBlogPostPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
