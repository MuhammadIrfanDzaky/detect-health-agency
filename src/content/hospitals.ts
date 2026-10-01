// Partner hospitals as listed on DHA's Instagram (10 Aug 2026 post).
// Logos in /public/partners (official files provided by DHA, white made transparent).
// Extra details per hospital live in messages/*.json -> hospitals.details.

export type CityKey = "penang" | "kualaLumpur" | "melaka";

export type Hospital = {
  id: string;
  name: string;
  city: CityKey;
  logo: string | null;
};

export const hospitals: Hospital[] = [
  { id: "sunwayPenang", name: "Sunway Medical Centre Penang", city: "penang", logo: "/partners/sunway-penang.png" },
  { id: "northernHeart", name: "Northern Heart Hospital Penang", city: "penang", logo: "/partners/northern-heart-penang.png" },
  { id: "optimax", name: "Optimax Eye Specialist Hospital Penang", city: "penang", logo: "/partners/optimax-penang.png" },
  { id: "gleneaglesKL", name: "Gleneagles Kuala Lumpur", city: "kualaLumpur", logo: "/partners/gleneagles-kl.png" },
  { id: "pantaiKL", name: "Pantai Hospital Kuala Lumpur", city: "kualaLumpur", logo: "/partners/pantai-kl.png" },
  { id: "pantaiMelaka", name: "Pantai Hospital Melaka", city: "melaka", logo: "/partners/pantai-melaka.png" },
];

// North to south.
export const cities: { key: CityKey }[] = [{ key: "penang" }, { key: "kualaLumpur" }, { key: "melaka" }];
