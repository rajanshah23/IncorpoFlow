import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CompanyFormData } from "../../types";

interface CompanyFormProps {
  initialData?: CompanyFormData;
  onSubmit: (data: CompanyFormData) => void;
  isLoading?: boolean;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    watch,
  } = useForm<CompanyFormData>({
    defaultValues: initialData || {
      name: "",
      numberOfShareholders: 1,
      totalCapitalInvested: 0,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmitHandler: SubmitHandler<CompanyFormData> = (data) => {
    onSubmit(data);
  };

  const shareholdersCount = watch("numberOfShareholders");

  // Base input classes with visible borders
  const baseInputClasses =
    "mt-1 block w-full rounded-md shadow-sm border-2 focus:border-blue-600 focus:ring-blue-600 focus:ring-2 focus:ring-opacity-50 transition-colors";

  const getInputClasses = (fieldName: keyof CompanyFormData) => {
    return `${baseInputClasses} ${
      errors[fieldName]
        ? "border-red-500 bg-red-50"
        : "border-gray-400 hover:border-gray-600"
    }`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
      {/* Company Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: "Company name is required",
            minLength: {
              value: 2,
              message: "Must be at least 2 characters",
            },
            maxLength: {
              value: 100,
              message: "Must not exceed 100 characters",
            },
          })}
          className={getInputClasses("name")}
          placeholder="Enter company name"
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 font-medium" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Number of Shareholders */}
      <div>
        <label
          htmlFor="numberOfShareholders"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Shareholders <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="numberOfShareholders"
          min="1"
          max="100"
          step="1"
          {...register("numberOfShareholders", {
            required: "Number of shareholders is required",
            min: {
              value: 1,
              message: "Minimum 1 shareholder required",
            },
            max: {
              value: 100,
              message: "Maximum 100 shareholders allowed",
            },
            valueAsNumber: true,
          })}
          className={getInputClasses("numberOfShareholders")}
          placeholder="Enter number of shareholders"
          aria-invalid={errors.numberOfShareholders ? "true" : "false"}
        />
        {errors.numberOfShareholders && (
          <p className="mt-1 text-sm text-red-600 font-medium" role="alert">
            {errors.numberOfShareholders.message}
          </p>
        )}
        {!errors.numberOfShareholders && shareholdersCount > 0 && (
          <p className="mt-1 text-sm text-gray-600 font-medium">
            You'll add {shareholdersCount} shareholder
            {shareholdersCount !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Total Capital Invested */}
      <div>
        <label
          htmlFor="totalCapitalInvested"
          className="block text-sm font-medium text-gray-700"
        >
          Total Capital Invested ($) <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-600 font-medium sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="totalCapitalInvested"
            min="0"
            step="0.01"
            {...register("totalCapitalInvested", {
              required: "Total capital is required",
              min: {
                value: 0,
                message: "Amount cannot be negative",
              },
              validate: {
                validNumber: (value) =>
                  !isNaN(value) || "Please enter a valid number",
              },
              valueAsNumber: true,
            })}
            className={`${getInputClasses("totalCapitalInvested")} pl-7 pr-12`}
            placeholder="0.00"
            aria-invalid={errors.totalCapitalInvested ? "true" : "false"}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-600 font-medium sm:text-sm">USD</span>
          </div>
        </div>
        {errors.totalCapitalInvested && (
          <p className="mt-1 text-sm text-red-600 font-medium" role="alert">
            {errors.totalCapitalInvested.message}
          </p>
        )}
      </div>

      {/* Submit Button - Now Blue */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading || !isDirty || !isValid}
          className="
    w-full flex justify-center items-center
    py-3 px-4
    rounded-lg
    text-sm font-semibold text-white
    bg-blue-600 hover:bg-blue-700
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transition duration-200 ease-in-out
    shadow-md hover:shadow-lg
  "
          aria-label={
            isLoading
              ? "Processing..."
              : initialData
                ? "Update company"
                : "Create company"
          }
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Saving...
            </span>
          ) : initialData ? (
            "Update Company"
          ) : (
            "Create Company"
          )}
        </button>
      </div>

      {/* Required Fields Note */}
      <p className="text-xs text-gray-500 text-center border-t border-gray-200 pt-4">
        <span className="text-red-500 font-bold">*</span> Required fields
      </p>
    </form>
  );
};

export default CompanyForm;
