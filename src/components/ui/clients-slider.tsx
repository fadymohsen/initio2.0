"use client";

const clients = [
  { name: "Saudi Aramco", logo: "/clients/aramco.webp" },
  { name: "SABIC", logo: "/clients/sabic.webp" },
  { name: "Sadara", logo: "/clients/sadara.jpg" },
  { name: "Riyadh Season", logo: "/clients/riyadh-season.png" },
  { name: "General Sports Authority", logo: "/clients/general-sports-authority.jpg" },
];

export const ClientsSlider = () => {
  return (
    <section className="relative w-full py-20">
      {/* Heading */}
      <div className="text-center mb-14 px-6">
        <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#71B8E3]/80 mb-3">
          Trusted By
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-white">
          Our Clients
        </h2>
      </div>

      {/* Static logos row */}
      <div className="flex items-center justify-center gap-12 md:gap-16 px-6 flex-wrap">
        {clients.map((client) => (
          <img
            key={client.name}
            src={client.logo}
            alt={client.name}
            className="h-16 md:h-20 w-auto select-none object-contain opacity-50 grayscale hover:opacity-90 hover:grayscale-0 transition-all duration-500"
            style={{ mixBlendMode: "screen" }}
          />
        ))}
      </div>
    </section>
  );
};
