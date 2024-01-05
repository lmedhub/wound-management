import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import BacksideHuman from "../components/BacksideHuman";
import FrontsideHuman from "../components/FrontsideHuman";

const myWounds: React.FC = () => {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { type, location, note };
      await fetch("/api/wound", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Wound</h1>
          <select
            autoFocus
            onChange={(e) => setType(e.target.value)}
            value={type}
            style={{
              width: "100%",
              padding: "0.5rem",
              margin: "0.5rem 0",
              borderRadius: "0.25rem",
              border: "0.125rem solid rgba(0, 0, 0, 0.2)",
              boxSizing: "border-box", // Ensure padding and border are included in the width
            }}
          >
            <option value="" disabled>
              Select type of wound
            </option>
            <option value="Abrasion">Abrasion</option>
            <option value="Laceration">Laceration</option>
            <option value="Incision">Incision</option>
            <option value="Puncture">Puncture</option>
            <option value="Avulsion">Avulsion</option>
            <option value="Contusion">Contusion (Bruise)</option>
            <option value="Fracture">Fracture</option>
            <option value="Internal Bleeding">Internal Bleeding</option>
          </select>

          <input
            readOnly
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            type="text"
            value={location}
          />
          <input
            onChange={(e) => setNote(e.target.value)}
            placeholder="Notes"
            type="text"
            value={note}
          />
          <input disabled={!location || !type} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
        Front Side:
        <FrontsideHuman onLocationChange={handleLocationChange} />
        Back side:
        <BacksideHuman onLocationChange={handleLocationChange} />
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default myWounds;
