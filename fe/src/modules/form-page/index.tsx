"use client";

import type React from "react";
import { useState } from "react";

export default function SurveyForm() {
  const [formData, setFormData] = useState({
    title: { label: "", name: "" },
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    performanceRating: "",
    stressSources: "",
    workBalance: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    if (name === "title" && e.target instanceof HTMLSelectElement) {
      const selectedOption = e.target.options[e.target.selectedIndex];
      setFormData((prev) => ({
        ...prev,
        title: { ...prev.title, label: selectedOption.text },
      }));
    } else if (name === "titleName") {
      setFormData((prev) => ({
        ...prev,
        title: { ...prev.title, name: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  


  const handleButtonSelection = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    if (formData.title.name === "") return false;

    const day = Number.parseInt(formData.dobDay);
    const month = Number.parseInt(formData.dobMonth);
    const year = Number.parseInt(formData.dobYear);

    if (
      isNaN(day) ||
      isNaN(month) ||
      isNaN(year) ||
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1920 ||
      year > 2006
    ) {
      return false;
    }

    if (formData.performanceRating === "") return false;
    if (formData.stressSources.trim().length === 0) return false;
    if (formData.workBalance === "") return false;

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      const formattedData = {
        title: formData.title,
        dateOfBirth: {
          day: formData.dobDay,
          month: formData.dobMonth,
          year: formData.dobYear,
        },
        performanceRating: Number.parseInt(formData.performanceRating),
        stressSources: formData.stressSources,
        workBalance: formData.workBalance,
      };

      console.log("Survey completed:", JSON.stringify(formattedData, null, 2));
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    const formattedData = {
      title: formData.title,
      dateOfBirth: {
        day: formData.dobDay,
        month: formData.dobMonth,
        year: formData.dobYear,
      },
      performanceRating: Number.parseInt(formData.performanceRating),
      stressSources: formData.stressSources,
      workBalance: formData.workBalance,
    };

    return (
      <div className="max-w-3xl mx-auto p-6 font-sans">
        <div className="bg-white p-6 shadow-md rounded">
          <div className="text-center py-8">
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p>Your survey responses have been submitted successfully.</p>
            <pre className="bg-gray-100 p-4 rounded mt-6 text-left whitespace-pre-wrap font-mono">
              {JSON.stringify(formattedData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">Survey Form</h1>

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 shadow-md rounded">
          <div className="border-b pb-8">
            <h2 className="text-2xl font-bold mb-2">Question 1</h2>
            <p className="text-lg font-medium mb-4">Title and Name</p>

            <label className="block font-medium mb-2" htmlFor="title">
              Please select your title
            </label>
            <select
              id="title"
              name="title"
              value={formData.title.label}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a title</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Dr">Dr</option>
            </select>

            <label className="block font-medium mt-4 mb-2" htmlFor="titleName">
              Enter your name
            </label>
            <input
              id="titleName"
              name="titleName"
              type="text"
              value={formData.title.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full p-2 border rounded"
            />
          </div>


          <div className="border-b pb-8 mt-8">
            <h2 className="text-2xl font-bold mb-2">Question 2</h2>
            <p className="text-lg font-medium mb-4">Date of Birth</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-1" htmlFor="dobDay">
                  Day
                </label>
                <input
                  id="dobDay"
                  name="dobDay"
                  type="text"
                  placeholder="DD"
                  maxLength={2}
                  value={formData.dobDay}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1" htmlFor="dobMonth">
                  Month
                </label>
                <input
                  id="dobMonth"
                  name="dobMonth"
                  type="text"
                  placeholder="MM"
                  maxLength={2}
                  value={formData.dobMonth}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1" htmlFor="dobYear">
                  Year
                </label>
                <input
                  id="dobYear"
                  name="dobYear"
                  type="text"
                  placeholder="YYYY"
                  maxLength={4}
                  value={formData.dobYear}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          <div className="border-b pb-8 mt-8">
            <h2 className="text-2xl font-bold mb-2">Question 3</h2>
            <p className="text-lg font-medium mb-4">
              On a scale of 1-10, how would you rate your job performance?
            </p>
            <div className="flex flex-wrap gap-2">
              {[...Array(10)].map((_, i) => {
                const rating = (i + 1).toString();
                const isSelected = formData.performanceRating === rating;
                return (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleButtonSelection("performanceRating", rating)}
                    className={`w-12 h-12 border rounded ${isSelected ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300"
                      }`}
                  >
                    {rating}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-b pb-8 mt-8">
            <h2 className="text-2xl font-bold mb-2">Question 4</h2>
            <p className="text-lg font-medium mb-4">
              Any other sources of stress?
            </p>
            <textarea
              name="stressSources"
              value={formData.stressSources}
              onChange={handleChange}
              maxLength={250}
              placeholder="Enter your response here..."
              className="w-full p-2 border rounded min-h-[120px] resize-none"
            />
            <div className="text-right text-sm text-gray-500">
              {250 - formData.stressSources.length} characters remaining
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">Question 5</h2>
            <p className="text-lg font-medium mb-4">
              How would you describe your work-life balance?
            </p>
            <div className="flex flex-col gap-2">
              {["ideal", "satisfactory", "challenging", "extremely-challenging", "unmanageable"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleButtonSelection("workBalance", option)}
                  className={`text-left p-4 border rounded ${formData.workBalance === option ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300"
                    }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1).replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="text-right mt-6">
            <button
              type="submit"
              className={`px-6 py-3 rounded font-medium text-white ${isFormValid() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                }`}
              disabled={!isFormValid()}
            >
              Submit Survey
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
