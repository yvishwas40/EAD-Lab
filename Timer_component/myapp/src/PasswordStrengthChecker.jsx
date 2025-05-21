import { useState } from "react";

const checkPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength === 4) return { label: "Strong", color: "text-green-600" };
  if (strength === 3) return { label: "Medium", color: "text-yellow-500" };
  if (strength === 2) return { label: "Weak", color: "text-orange-500" };
  return { label: "Very Weak", color: "text-red-500" };
};

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const strength = checkPasswordStrength(password);

  return (
    <div className="p-4 max-w-sm mx-auto">
      <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <p className={`mt-2 font-semibold ${strength.color}`}>{strength.label}</p>
    </div>
  );
}
