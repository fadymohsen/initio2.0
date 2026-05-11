"use client";

const clients = [
  { name: "Saudi Aramco", logo: "/clients/aramco.webp" },
  { name: "SABIC", logo: "/clients/sabic.webp" },
  { name: "Sadara", logo: "/clients/sadara.jpg" },
  { name: "Riyadh Season", logo: "/clients/riyadh-season.png" },
  { name: "General Sports Authority", logo: "/clients/general-sports-authority.jpg" },
];

export const ClientsSlider = () => {
  // Double the array for seamless infinite scroll
  const logos = [...clients, ...clients];

  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-14 px-6">
        <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80 mb-3">
          Trusted By
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-white">
          Our Clients
        </h2>
      </div>

      {/* Sliding track */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex items-center w-max gap-20 animate-marquee">
          {logos.map((client, i) => (
            <img
              key={i}
              src={client.logo}
              alt={client.name}
              className="h-10 md:h-12 w-auto shrink-0 select-none object-contain opacity-40 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-500"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
