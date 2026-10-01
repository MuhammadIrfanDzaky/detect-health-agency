// Temporary stock photography from Unsplash (free under the Unsplash License),
// hotlinked as Unsplash asks. Replace with DHA's own photos when available.
// Credits are kept here and in the README, not printed on the page.

type Photo = { id: string; credit: string; page: string };

export const photos = {
  hero: {
    id: "photo-1758691462858-f1286e5daf40",
    credit: "@silverkblack",
    page: "https://unsplash.com/photos/doctor-consulting-with-an-elderly-patient-in-an-office-Ey-IxmbZ5TQ",
  },
  pickup: {
    id: "photo-1744209744114-d14a502c6aff",
    credit: "@hidayatabuhady",
    page: "https://unsplash.com/photos/an-empty-airport-terminal-with-a-meeting-point-sign-A2aSymsgqqs",
  },
  penang: {
    id: "photo-1748794398641-76178b6d1ccb",
    credit: "@zyteng",
    page: "https://unsplash.com/photos/rickshaws-and-tourists-on-a-street-Q53ji_rF-lo",
  },
  kualaLumpur: {
    id: "photo-1566914447826-bf04e54bf1be",
    credit: "@travelwithcm",
    page: "https://unsplash.com/photos/petronas-twin-towers-malaysia-arO-dPwRolA",
  },
  melaka: {
    id: "photo-1571761348738-f448a9739ff5",
    credit: "@bari_21",
    page: "https://unsplash.com/photos/red-cathedral-under-blue-sky-oCG_-UrvaPE",
  },
  travel: {
    id: "photo-1703667863795-5f7ec034e05f",
    credit: "@fajrihfzh",
    page: "https://unsplash.com/photos/a-boat-traveling-down-a-river-next-to-tall-buildings-2AWi2LKFvuo",
  },
} satisfies Record<string, Photo>;

export function photoUrl(photo: Photo) {
  return `https://images.unsplash.com/${photo.id}`;
}
