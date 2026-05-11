"use client";

const clients = [
  { name: "Saudi Aramco", logo: "/clients/aramco.png" },
  { name: "SABIC", logo: "/clients/sabic.png" },
  { name: "Sadara", logo: "/clients/sadara.png" },
  { name: "Riyadh Season", logo: "/clients/riyadh-season.png" },
  { name: "General Sports Authority", logo: "/clients/general-sports-authority.png" },
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

      {/* Infinite sliding logos */}
      <div className="overflow-hidden w-full">
        <div
          className="flex w-max items-center gap-12 md:gap-16"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {[...clients, ...clients].map((client, i) => (
            <img
              key={`${client.name}-${i}`}
              src={client.logo}
              alt={client.name}
              className="h-16 md:h-20 w-auto select-none object-contain shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
