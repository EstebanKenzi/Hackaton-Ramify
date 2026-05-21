export function calculateScore(materials: string, originFabric: string, originManufacturing: string) {
  let score = 50; // Base score

  const materialsLower = materials.toLowerCase();
  const originFabricLower = originFabric.toLowerCase();
  const originManufacturingLower = originManufacturing.toLowerCase();

  // Règles sur les matières
  if (materialsLower.includes('recycl') || materialsLower.includes('bio')) {
    score += 25;
  }
  if ((materialsLower.includes('synthétique') || materialsLower.includes('polyester')) && !materialsLower.includes('recycl')) {
    score -= 20;
  }

  // Règles sur l'origine (liste simplifiée pour l'exemple)
  const europeCountries = ['france', 'portugal', 'espagne', 'italie', 'allemagne', 'belgique'];
  
  const isFabricEurope = europeCountries.some(c => originFabricLower.includes(c));
  const isManufacturingEurope = europeCountries.some(c => originManufacturingLower.includes(c));

  if (isFabricEurope) score += 15;
  else score -= 10;

  if (isManufacturingEurope) score += 15;
  else score -= 10;

  // Limiter le score entre 0 et 100
  score = Math.max(0, Math.min(100, score));

  // Attribution de la note (Grade)
  let grade = 'C';
  if (score >= 85) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 50) grade = 'C';
  else if (score >= 30) grade = 'D';
  else grade = 'E';

  return { percentage: score, grade };
}
