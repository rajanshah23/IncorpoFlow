import React, { useState } from "react";
import { Shareholder } from "../../types";

interface ShareholderFormProps {
  numberOfShareholders: number;
  onSubmit: (shareholders: Omit<Shareholder, "id">[]) => void;
  isLoading?: boolean;
}

const ShareholderForm: React.FC<ShareholderFormProps> = ({
  numberOfShareholders,
  onSubmit,
  isLoading = false,
}) => {
  const [shareholders, setShareholders] = useState<Omit<Shareholder, "id">[]>(
    Array(numberOfShareholders)
      .fill(null)
      .map(() => ({
        firstName: "",
        lastName: "",
        nationality: "",
      })),
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    index: number,
    field: keyof Omit<Shareholder, "id">,
    value: string,
  ) => {
    const updated = [...shareholders];
    updated[index] = { ...updated[index], [field]: value };
    setShareholders(updated);

    // Clear error for this field
    const errorKey = `${index}-${field}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    shareholders.forEach((shareholder, index) => {
      if (!shareholder.firstName.trim()) {
        newErrors[`${index}-firstName`] = "First name is required";
      } else if (shareholder.firstName.length < 2) {
        newErrors[`${index}-firstName`] =
          "First name must be at least 2 characters";
      }

      if (!shareholder.lastName.trim()) {
        newErrors[`${index}-lastName`] = "Last name is required";
      } else if (shareholder.lastName.length < 2) {
        newErrors[`${index}-lastName`] =
          "Last name must be at least 2 characters";
      }

      if (!shareholder.nationality.trim()) {
        newErrors[`${index}-nationality`] = "Nationality is required";
      } else if (shareholder.nationality.length < 2) {
        newErrors[`${index}-nationality`] =
          "Nationality must be at least 2 characters";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(shareholders);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {shareholders.map((shareholder, index) => (
        <div
          key={index}
          className="border border-[#1e3a6b] rounded-lg p-6 space-y-4 bg-gray-50"
        >
          <h3 className="text-lg font-medium text-[#0a1929]">
            Shareholder {index + 1} of {numberOfShareholders}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                value={shareholder.firstName}
                onChange={(e) =>
                  handleChange(index, "firstName", e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0a1929] focus:ring-[#0a1929]"
              />
              {errors[`${index}-firstName`] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[`${index}-firstName`]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                value={shareholder.lastName}
                onChange={(e) =>
                  handleChange(index, "lastName", e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0a1929] focus:ring-[#0a1929]"
              />
              {errors[`${index}-lastName`] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[`${index}-lastName`]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nationality *
              </label>
              <input
                type="text"
                value={shareholder.nationality}
                onChange={(e) =>
                  handleChange(index, "nationality", e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0a1929] focus:ring-[#0a1929]"
              />
              {errors[`${index}-nationality`] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[`${index}-nationality`]}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0a1929] hover:bg-[#132f4c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a1929] disabled:opacity-50 border border-[#1e3a6b]"
        >
          {isLoading ? "Saving..." : "Add Shareholders"}
        </button>
      </div>
    </form>
  );
};

export default ShareholderForm;
