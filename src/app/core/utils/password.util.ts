export interface PasswordCheck {
  label: string;
  ok: boolean;
}

export interface PasswordStrength {
  /** 0 (empty) – 4 (strong) */
  score: number;
  label: string;
  checks: PasswordCheck[];
}

export function checkPassword(pw: string): PasswordStrength {
  const checks: PasswordCheck[] = [
    { label: '8+ characters', ok: pw.length >= 8 },
    { label: 'Uppercase letter', ok: /[A-Z]/.test(pw) },
    { label: 'A number', ok: /\d/.test(pw) },
    { label: 'A symbol', ok: /[^A-Za-z0-9]/.test(pw) },
  ];
  const score = pw ? Math.max(1, checks.filter((c) => c.ok).length) : 0;
  return { score, label: ['', 'Weak', 'Fair', 'Good', 'Strong'][score], checks };
}
