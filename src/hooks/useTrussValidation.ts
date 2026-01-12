import { useEffect, useState } from "react";

export interface TrussValidationErrors {
  trussWidth: string;
  pitch: string;
  maxVerticalMemberSpacing: string;
  memberSize: string;
}

export function useTrussValidation({
  trussWidth,
  pitch,
  maxVerticalMemberSpacing,
  memberSize,
}: {
  trussWidth: number;
  pitch: number;
  maxVerticalMemberSpacing: number;
  memberSize: number;
}) {
  const [errors, setErrors] = useState<TrussValidationErrors>({
    trussWidth: "",
    pitch: "",
    maxVerticalMemberSpacing: "",
    memberSize: "",
  });

  useEffect(() => {
    setErrors({
      trussWidth: trussWidth <= 0 ? "Width must be greater than 0." : "",
      pitch:
        pitch <= 0 || pitch >= 90
          ? "Pitch must be between 1 and 89 degrees."
          : "",
      maxVerticalMemberSpacing:
        maxVerticalMemberSpacing <= 0 ? "Spacing must be greater than 0." : "",
      memberSize: memberSize <= 0 ? "Member size must be greater than 0." : "",
    });
  }, [trussWidth, pitch, maxVerticalMemberSpacing, memberSize]);

  const hasErrors = Object.values(errors).some(Boolean);

  return { errors, hasErrors };
}
