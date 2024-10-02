import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20 pt-28 lg:pt-40">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Instant Flash Loans on the <br /> TRON Blockchain
          </h1>
          <p className="text-lg mb-8">
            Unlock the power of uncollateralized loans for DeFi operations like
            arbitrage, refinancing, and much more.
          </p>
          <a
            href="#get-started"
            className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition duration-200 ease-in-out"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
            Why Choose RapidLoans?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out">
              <div className="mb-4">
                <svg
                  className="w-12 h-12 mx-auto text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8 0-4.411 3.589-8 8-8 4.411 0 8 3.589 8 8 0 4.411-3.589 8-8 8z" />
                  <path d="M13 7h-2v6h6v-2h-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Flash Loans</h3>
              <p>
                Access instant loans without collateral for arbitrage,
                liquidation, and refinancing in one transaction.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out">
              <div className="mb-4">
                <svg
                  className="w-12 h-12 mx-auto text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2a10 10 0 110 20 10 10 0 010-20zm0 18c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8zM11 10h-2v2h2v6h2v-6h2v-2h-2V8h2V6h-2V4h-2v2H9v2h2v2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Governance</h3>
              <p>
                Participate in decentralized governance with HTX DAO to vote on
                protocol changes and improve the platform.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out">
              <div className="mb-4">
                <svg
                  className="w-12 h-12 mx-auto text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 4h16v2H4zm0 10h16v2H4zm0-5h16v2H4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">TRON Ecosystem</h3>
              <p>
                Seamlessly integrated with the TRON blockchain for fast, secure,
                and cost-effective transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-gray-100 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                1. Connect Your Wallet
              </h3>
              <p>
                Connect your TRON wallet using TRONLink or TRONWeb.js for secure
                interaction with the dApp.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                2. Request a Flash Loan
              </h3>
              <p>
                Request a flash loan by specifying the token, amount, and
                purpose. Utilize it for arbitrage or liquidity swaps.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">3. Repay the Loan</h3>
              <p>
                Ensure you repay the loan and fees within the same transaction
                to avoid liquidation or other penalties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 bg-white text-gray-900 rounded-lg shadow-md">
              <p className="italic mb-4">
                "RapidLoans enabled me to execute profitable arbitrage in just
                one transaction! Game-changing for my DeFi strategies."
              </p>
              <h3 className="font-bold">– Jane Doe</h3>
            </div>
            <div className="p-8 bg-white text-gray-900 rounded-lg shadow-md">
              <p className="italic mb-4">
                "The governance system is impressive. I love having a say in the
                future direction of the platform!"
              </p>
              <h3 className="font-bold">– John Smith</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-8">Get in Touch</h2>
          <p className="mb-8">
            Want to learn more about RapidLoans or partner with us? Reach out
            today.
          </p>
          <a
            href="mailto:support@rapidloans.com"
            className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-200 ease-in-out"
          >
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
