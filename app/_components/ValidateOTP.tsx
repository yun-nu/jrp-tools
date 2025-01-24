"use client";

import { validateOTP } from "../_lib/data-service";

export default function ValidateOTP() {
  return (
    <button
      onClick={() => validateOTP("yunnu@live.com", "758942")}
      className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full"
    >
      <span>Validate</span>
    </button>
  );
}
