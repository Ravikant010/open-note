import React from 'react';

const Footer = () => {
  const sections = [
    {
      title: "Product",
      links: ["Privacy", "Pricing", "Terms", "Feedback", "Get Started", "Legal"]
    },
    {
      title: "Resources",
      links: ["Docs", "Blog", "Updates", "Roadmap", "Status", "Stories"]
    },
    {
      title: "Support",
      links: ["Contact", "Canny", "UserVoice", "NolLio", "Alternative"]
    },
    {
      title: "Legal",
      links: ["Definitions", "Terms of Service", "Privacy Policy", "Licenses"]
    }
  ];

  return (
    <footer className="bg-transparent text-gray-500 py-12 font-sans font-medium mt-10">
      <div className="container mx-auto px-6 lg:px-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 ">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="/" 
                      className="text-base hover:text-gray-800 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Open Note. <br/> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;