export function calculatePasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;

  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;

  // Character variety checks
  if (/[A-Z]/.test(password)) score += 1; // Uppercase
  if (/[a-z]/.test(password)) score += 1; // Lowercase
  if (/[0-9]/.test(password)) score += 1; // Numbers
  if (/[^A-Za-z0-9]/.test(password)) score += 1; // Special characters

  // Sequential/repeated character check (reduces score)
  if (/(.)\\1{2,}/.test(password)) score -= 1;
  if (/(?:abc|bcd|cde|def|efg|123|234|345)/.test(password.toLowerCase())) score -= 1;

  // Ensure score stays within bounds
  score = Math.max(0, Math.min(score, 4));

  const strengthLevels = [
    { score: 0, label: 'Muito fraca', color: 'bg-red-500' },
    { score: 1, label: 'Fraca', color: 'bg-orange-500' },
    { score: 2, label: 'Média', color: 'bg-yellow-500' },
    { score: 3, label: 'Forte', color: 'bg-green-500' },
    { score: 4, label: 'Épica', color: 'bg-purple-500' },
  ];

  return strengthLevels[score];
}