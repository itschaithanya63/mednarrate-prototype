import { useState } from "react";
import { useNavigate } from "react-router-dom";

function IdCreation() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");

  const navigate = useNavigate();

  const isFormComplete =
    name.trim() !== "" &&
    age !== "" &&
    gender !== "" &&
    contact.trim() !== "";

  function handleContinue() {
    if (!isFormComplete) {
      return;
    }

    navigate("/role", {
      state: {
        name: name,
        age: age,
        gender: gender,
        contact: contact
      }
    });
  }

  return (
    <div className="id-page">

      <div className="patient-world">

        {/* TITLE */}
        <h1 className="patient-title">
          MedNarrate
        </h1>

        <p className="patient-subtitle">
          Let's create your ID first
        </p>


        {/* FORM */}
        <div className="patient-form">

          {/* NAME */}
          <div className="form-field">
            <p className="question-hint">
              Name
            </p>

            <input
              className="styled-input"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          {/* AGE */}
          <div className="form-field">
            <p className="question-hint">
              Age
            </p>

            <input
              className="styled-input"
              type="number"
              min="1"
              max="120"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>


          {/* GENDER */}
          <div className="form-field">
            <p className="question-hint">
              Gender
            </p>

            <div className="gender-options">

              {/* MALE */}
              <label
                className={
                  gender === "Male"
                    ? "gender-option selected"
                    : "gender-option"
                }
              >
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={() => setGender("Male")}
                />

                <span>Male</span>
              </label>


              {/* FEMALE */}
              <label
                className={
                  gender === "Female"
                    ? "gender-option selected"
                    : "gender-option"
                }
              >
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={() => setGender("Female")}
                />

                <span>Female</span>
              </label>


              {/* OTHER */}
              <label
                className={
                  gender === "Other"
                    ? "gender-option selected"
                    : "gender-option"
                }
              >
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={gender === "Other"}
                  onChange={() => setGender("Other")}
                />

                <span>Other</span>
              </label>

            </div>
          </div>


          {/* PHONE / EMAIL */}
          <div className="form-field">
            <p className="question-hint">
              Phone or Email
            </p>

            <input
              className="styled-input"
              type="text"
              placeholder="Enter phone or email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

        </div>


        {/* CONTINUE */}
        <button
          type="button"
          className="btn-primary"
          disabled={!isFormComplete}
          onClick={handleContinue}
        >
          Continue
        </button>

      </div>

    </div>
  );
}

export default IdCreation;