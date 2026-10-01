// Partner hospitals. Profiles and highlights come from DHA (hospital.md).
// Logos in /public/partners (official files provided by DHA, white made transparent).
// Extra details per hospital live in messages/*.json -> hospitals.details.

export type CityKey = "penang" | "kualaLumpur" | "melaka";

export type Hospital = {
  id: string;
  name: string;
  city: CityKey;
  logo: string | null;
  // Photo of the hospital building (/public/partners/photos, provided by DHA).
  // If null, the detail view falls back to the city photo.
  photo: string | null;
};

export const hospitals: Hospital[] = [
  { id: "sunwayPenang", name: "Sunway Medical Centre", city: "penang", logo: "/partners/sunway-penang.png", photo: "/partners/photos/sunway-penang.webp" },
  { id: "northernHeart", name: "Northern Heart Hospital", city: "penang", logo: "/partners/northern-heart-penang.png", photo: "/partners/photos/northern-heart-penang.webp" },
  { id: "optimax", name: "Optimax Eye Specialist Hospital", city: "penang", logo: "/partners/optimax-penang.png", photo: "/partners/photos/optimax-penang.webp" },
  { id: "gleneaglesKL", name: "Gleneagles Hospital", city: "kualaLumpur", logo: "/partners/gleneagles-kl.png", photo: "/partners/photos/gleneagles-kl.webp" },
  { id: "pantaiKL", name: "Pantai Hospital", city: "kualaLumpur", logo: "/partners/pantai-kl.png", photo: "/partners/photos/pantai-kl.webp" },
  { id: "pantaiMelaka", name: "Pantai Hospital", city: "melaka", logo: "/partners/pantai-melaka.png", photo: "/partners/photos/pantai-melaka.webp" },
];
