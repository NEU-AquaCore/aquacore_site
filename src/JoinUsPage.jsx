import PageHeader from './components/PageHeader';
import React from 'react';

export default function JoinUsPage() {
  return (
    <div className="aqua-legacy-page min-h-screen bg-[#181818] text-white">
      {/* Hero Section */}
      <PageHeader eyebrow="AquaCore NEU" title="Join AquaCore" description={"Bring your curiosity. Join a multidisciplinary team building the future of underwater robotics."} image={"/images/team-2x.jpg"}><div className="aqua-button-row"><a href="https://docs.qq.com/form/page/DTUZ4b2hpdE5SU1Bx" target="_blank" rel="noopener noreferrer" className="aqua-button">Apply now ↗</a><a href="/team" className="aqua-button aqua-button-outline">Meet our team →</a></div></PageHeader>

      {/* Why Join Section */}
      <section className="py-16 px-4 sm:px-8 md:px-20 bg-[#1a1a1a]">
        <div className="w-full max-w-screen-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 text-center mb-12">
            Why Join AquaCore?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3">Hands-on Experience</h3>
              <p className="text-gray-400">
                Work on real underwater robotics projects and gain practical engineering skills.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-3">Competition Experience</h3>
              <p className="text-gray-400">
                Compete in international robotics competitions like SAUVC and RoboSub.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
              <p className="text-gray-400">
                Work with a diverse team of engineers, designers, and innovators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 px-4 sm:px-8 md:px-20">
        <div className="w-full max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-8">
            Ready to Join?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Click the button below to access our recruitment form and start your journey with AquaCore.
          </p>
          <a 
            href="https://docs.qq.com/form/page/DTUZ4b2hpdE5SU1Bx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 text-lg rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Apply for AY 26/27
          </a>
        </div>
      </section>
    </div>
  );
} 
