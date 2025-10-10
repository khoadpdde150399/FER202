// src/pages/AccountPage.jsx
import React, { useState } from "react";
import { Container, ProgressBar, Button } from "react-bootstrap";
import AboutForm from "./AboutForm";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";


export default function AccountPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const progress = ((step + 1) / 3) * 100;

  function validateStep(currentStep) {
    const err = {};
    if (currentStep === 0) {
      if (!data.firstName) err.firstName = "First name is required";
      if (!data.lastName) err.lastName = "Last name is required";
      if (!data.email) err.email = "Email is required";
    }
    if (currentStep === 1) {
      if (!data.username) err.username = "Username required";
      if (!data.password) err.password = "Password required";
      if (!data.confirmPassword) err.confirmPassword = "Confirm password";
      if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
        err.confirmPassword = "Passwords do not match";
      }
    }
    if (currentStep === 2) {
      if (!data.street) err.street = "Street required";
      if (!data.city) err.city = "City required";
      if (!data.country) err.country = "Country required";
      if (!data.zip) err.zip = "Zip required";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function nextStep() {
    if (!validateStep(step)) return;
    setStep(s => Math.min(2, s + 1));
  }

  function prevStep() {
    setStep(s => Math.max(0, s - 1));
  }

  function finish() {
    if (!validateStep(step)) return;
    // finish (no backend): show success (alert) or redirect
    alert("Profile completed! (UI only)");
  }

  return (
    <Container className="mt-4">
      <h3>Build Your Profile</h3>
      <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-3" />

      {step === 0 && <AboutForm data={data} onChange={setData} errors={errors} />}
      {step === 1 && <AccountForm data={data} onChange={setData} errors={errors} />}
      {step === 2 && <AddressForm data={data} onChange={setData} errors={errors} />}

      <div className="mt-3 d-flex justify-content-between">
        <Button variant="secondary" onClick={prevStep} disabled={step === 0}>Previous</Button>
        {step < 2 ? (
          <Button variant="primary" onClick={nextStep}>Next</Button>
        ) : (
          <Button variant="success" onClick={finish}>Finish</Button>
        )}
      </div>
    </Container>
  );
}
