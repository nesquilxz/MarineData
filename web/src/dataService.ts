import rawCsv from '../bounties.csv?raw';

export interface PirateRecord {
  pirata: string;
  tripulacao: string;
  capitao: string;
  bounty: number;
  ilha: string;
  status_historia: string;
  observacoes: string;
}

const PIRATE_IMAGES: Record<string, string> = {
  "Luffy": "https://i.pinimg.com/736x/71/43/32/714332efdf6bf9317d777403c52064bd.jpg",
  "Zoro": "https://i.pinimg.com/736x/42/3d/b8/423db8c8e4fe15894b73146ef542495c.jpg",
  "Chopper": "https://i.pinimg.com/736x/49/21/8d/49218d1d169c358d86057a9fc1d9fb76.jpg",
  "Robin": "https://i.pinimg.com/736x/89/66/7c/89667ce03b5a11112ef5e2411a324bce.jpg",
  "Hancock": "https://i.pinimg.com/736x/bf/a4/e5/bfa4e5b37e3bc63fffaf8b2a4813708f.jpg",
  "Law": "https://i.pinimg.com/736x/88/df/31/88df31a12e758d619ebc2cfe889546ed.jpg",
  "Sabo": "https://i.pinimg.com/736x/04/cb/4e/04cb4e9d8633b9b2606be2512e659811.jpg",
  "Barba Branca": "https://i.pinimg.com/736x/0c/47/7b/0c477b74ce24a042b93beae761655bda.jpg",
  "Teach": "https://i.pinimg.com/736x/2e/9b/2b/2e9b2b7ed967a7d509119f350299001e.jpg",
  "Buggy": "https://i.pinimg.com/736x/38/4a/1e/384a1e5876c1ed05c4c127d1a2614279.jpg",
  "Mihawk": "https://i.pinimg.com/736x/b3/7d/ce/b37dce3e963473bcea2179026f00bcb1.jpg",
  "Shanks": "https://i.pinimg.com/736x/4c/f0/00/4cf00074cd923309abe481b7cfe351b9.jpg",
  "Vivi": "https://i.pinimg.com/1200x/bc/fa/ca/bcfaca759e916c567ad1bf0db9d7cf16.jpg",
  "Linlin": "https://i.pinimg.com/736x/e9/bc/b1/e9bcb151a780440d1e9e679bf43bafe0.jpg",
  "Kid": "https://i.pinimg.com/736x/cc/97/21/cc9721308bd7f2290fcb0ffe87c3fdae.jpg",
  "Marco": "https://i.pinimg.com/736x/21/90/c4/2190c4b404e63f74c720759df2098b0c.jpg",
  "Kaido": "https://i.pinimg.com/1200x/6a/28/9a/6a289ab524b7854943efd1248234fe3f.jpg",
  "Brook": "https://i.pinimg.com/736x/49/e9/91/49e991a43fa074589e32be9bde0d53cd.jpg",
  "Roger": "https://i.pinimg.com/736x/3a/22/41/3a22412ea8e53f6c5c8e5b3c2d27e435.jpg",
  "Ace": "https://i.pinimg.com/736x/e1/c6/5b/e1c65b3aff827211252431b694690767.jpg",
  "Nami": "https://i.pinimg.com/736x/aa/17/6c/aa176c8d2e1809dcb08044e98bc318b3.jpg",
  "Coby": "https://i.pinimg.com/736x/5f/40/98/5f4098815afa59a6cf664854765da3d5.jpg",
  "Rayleigh": "https://i.pinimg.com/736x/13/73/43/1373435b76ca155346dc09ebe3b51e59.jpg",
  "Bepo": "https://i.pinimg.com/736x/13/f3/a4/13f3a4b5786d6f0b9d3da81271b77b3d.jpg",
  "Usopp": "https://i.pinimg.com/736x/65/fc/5c/65fc5c5a5ea7b120c473ca5f365a0955.jpg",
  "Sanji": "https://i.pinimg.com/736x/23/32/ac/2332ac9895a04dcae8881a45de082ea3.jpg",
  "Franky": "https://i.pinimg.com/1200x/eb/60/b6/eb60b659d7cd82f73bda8b30d4f2c864.jpg",
  "Jinbe": "https://i.pinimg.com/1200x/f1/3d/c9/f13dc9d0e2195ba918203177600b52e0.jpg",
  "King": "https://i.pinimg.com/736x/1b/a5/a5/1ba5a513d42b3e97e938376eec512643.jpg",
  "Queen": "https://i.pinimg.com/736x/a9/db/b6/a9dbb63e09b9dd6fbdd14fd19c1136d6.jpg",
  "Jack": "https://i.pinimg.com/736x/3c/ec/eb/3ceceb833857b4f42372de734b82100b.jpg",
  "Lafitte": "https://i.pinimg.com/736x/a4/ac/3c/a4ac3cc38e3301be8c35261edb8182a6.jpg",
  "Devon": "https://i.pinimg.com/736x/c9/21/12/c921127bd5ebd783b9bb0958c772388a.jpg",
  "Katakuri": "https://i.pinimg.com/1200x/7e/58/a4/7e58a4e4a4379fc69e7372b58eaa095f.jpg",
  "Smoothie": "https://i.pinimg.com/736x/4c/4f/12/4c4f12b8a19ac55d78362561b4eaeefd.jpg",
  "Perospero": "https://i.pinimg.com/736x/9b/ad/cf/9badcf814d4de5a119dcf6b437fc2f5c.jpg",
  "Burgess": "https://i.pinimg.com/736x/82/e6/e3/82e6e3b12d1f1d7d5ea6204afd18ae55.jpg",
  "Heat": "https://i.pinimg.com/736x/9c/cd/35/9ccd35f86bbfed443fa4ff213cab50b9.jpg",
  "Vista": "https://i.pinimg.com/736x/6e/4f/3a/6e4f3a8fe91660fbb7b971d2a7a896c4.jpg",
  "Crocodile": "https://i.pinimg.com/736x/9d/81/f7/9d81f703ca4524c9f13418a2398e6278.jpg",
  "Yasopp": "https://i.pinimg.com/736x/52/be/e6/52bee68fad7caf5a38d679868d5ca623.jpg",
  "Killer": "https://i.pinimg.com/736x/4b/bf/18/4bbf18881b4bf245585e4239f897ef15.jpg",
  "Ben Beckman": "https://i.pinimg.com/736x/47/c3/3e/47c33e90080bf91850d90917f350f74b.jpg",
  "Van Augur": "https://i.pinimg.com/736x/e9/f7/73/e9f77374684215fb29f4bbc7f76b2554.jpg",
  "Dragon": "https://i.pinimg.com/736x/c1/67/54/c1675431de988315c062ef71e1292107.jpg",
  "Ivankov": "https://i.pinimg.com/736x/8b/61/af/8b61af634b3f9fc7af39fc640b778565.jpg",
  "Kuma": "https://i.pinimg.com/736x/3c/86/bc/3c86bcf9c824e95ac7e57067100c12a1.jpg",
  "Shirahoshi": "https://i.pinimg.com/736x/85/ca/91/85ca91d8e87ad6da92dbe33d183f3e5b.jpg",
  "Oden": "https://i.pinimg.com/736x/8d/95/e1/8d95e17b2d584f99c28d68f5131728a1.jpg",
  "Yamato": "https://i.pinimg.com/736x/df/af/6a/dfaf6aa90c4836a70c7708b03ad5cc16.jpg",
  "Cracker": "https://i.pinimg.com/1200x/c2/d6/02/c2d602ab26711f374552d91b57afbeef.jpg",
  "Donquixote Doflamingo": "https://i.pinimg.com/736x/c2/93/82/c29382cd7e2ef0dd479318d56c0e60f3.jpg",
  "Lucky Roo": "https://i.pinimg.com/736x/7e/c1/c4/7ec1c440eee20d1c46ebf5c46b71a6e5.jpg",
  "Jewelry Bonney": "https://i.pinimg.com/736x/29/20/e9/2920e93f2e7c711c845c3bebd6ad74fa.jpg",
};

export const getPirateImage = (pirateName: string): string | null => {
  return PIRATE_IMAGES[pirateName] || null;
};

// Parse CSV into PirateRecord[]
function parseCsv(csv: string): PirateRecord[] {
  const lines = csv.split('\n').filter(line => line.trim() !== '');
  const [headerLine, ...dataLines] = lines;
  const headers = headerLine.split(',').map(h => h.trim());

  return dataLines.map(line => {
    // Split carefully: bounty can be a number, no quotes expected
    const cols = line.split(',');
    const row: Record<string, string> = {};
    headers.forEach((header, i) => {
      row[header] = (cols[i] ?? '').trim();
    });
    return {
      pirata: row['pirata'] ?? '',
      tripulacao: row['tripulacao'] ?? '',
      capitao: row['capitao'] ?? '',
      bounty: Number(row['bounty']) || 0,
      ilha: row['ilha'] ?? '',
      status_historia: row['status_historia'] ?? '',
      observacoes: row['observacoes'] ?? '',
    };
  });
}

const pirates: PirateRecord[] = parseCsv(rawCsv);

// 1 Total Bounty per Crew
export const getBountyByCrew = () => {
  const counts: Record<string, { tripulacao: string; bounty: number }> = {};
  pirates.forEach((p) => {
    if (!p.tripulacao) return;
    if (!counts[p.tripulacao]) {
      counts[p.tripulacao] = { tripulacao: p.tripulacao, bounty: 0 };
    }
    counts[p.tripulacao].bounty += p.bounty;
  });
  return Object.values(counts).sort((a, b) => b.bounty - a.bounty);
};

// 2 Average Bounty
export const getAverageBounty = () => {
  const sum = pirates.reduce((acc, curr) => acc + curr.bounty, 0);
  return sum / pirates.length;
};

// 3 Dangerous Captains
export const getDangerousCaptains = () => {
  const captains: Record<string, { capitao: string; bounty: number }> = {};
  pirates.forEach((p) => {
    if (!p.capitao) return;
    if (!captains[p.capitao]) {
      captains[p.capitao] = { capitao: p.capitao, bounty: 0 };
    }
    captains[p.capitao].bounty += p.bounty;
  });
  return Object.values(captains).sort((a, b) => b.bounty - a.bounty);
};

// 4 Top 3 Pirates with Highest Bounty (Excluding deceased)
export const getTop3Pirates = () => {
  return getAlivePirates().slice(0, 3);
};

// 5 Danger Level per Island (Filtered "Desconhecido")
export const getDangerByIsland = () => {
  const islands: Record<string, { ilha: string; bounty: number }> = {};
  pirates.filter(p => p.ilha !== "Desconhecido").forEach((p) => {
    if (!islands[p.ilha]) {
      islands[p.ilha] = { ilha: p.ilha, bounty: 0 };
    }
    islands[p.ilha].bounty += p.bounty;
  });
  return Object.values(islands).sort((a, b) => b.bounty - a.bounty);
};

// 6 Current Yonko (4 Emperors)
export const getYonko = () => {
  return pirates
    .filter(p => p.observacoes.includes("Imperador") && p.status_historia === "Vivo")
    .sort((a, b) => b.bounty - a.bounty)
    .slice(0, 4);
};

export const getTop5Emperors = getYonko;

// 7 Former Warlords (Ex-Shichibukai)
export const getExShichibukai = () => {
  return pirates
    .filter(p => p.observacoes.includes("Ex-Shichibukai") || p.observacoes.includes("Shichibukai"))
    .sort((a, b) => b.bounty - a.bounty);
};

// 8 Stats for Ex-Shichibukai
export const getExShichibukaiStats = () => {
  const group = getExShichibukai();
  if (group.length === 0) return { avg: 0, variance: 0 };
  const avg = group.reduce((acc, curr) => acc + curr.bounty, 0) / group.length;
  const variance = group.reduce((acc, curr) => acc + Math.pow(curr.bounty - avg, 2), 0) / group.length;
  return { avg, variance };
};

// 9 Dead Pirates (Explicitly confirmed Falecido)
export const getDeadPirates = () => {
  return pirates
    .filter(p => p.status_historia === "Falecido")
    .sort((a, b) => b.bounty - a.bounty);
};

// 10 Active Targets (Excluding only explicitly "Falecido" status)
export const getAlivePirates = () => {
  return pirates
    .filter(p => p.status_historia !== "Falecido")
    .sort((a, b) => b.bounty - a.bounty);
};

// 11 Combined Threat Ranking (sorted by bounty)
export const getCombinedThreatRanking = () => {
  return [...pirates].sort((a, b) => b.bounty - a.bounty);
};

// 12 Raw Data for feed
export const getAllPirates = () => {
  return [...pirates];
};
