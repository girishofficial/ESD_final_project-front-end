
import React from "react";

const FilterControls = ({
  domainFilter,
  specializationFilter,
  onDomainChange,
  onSpecializationChange,
  onRecalculateSpecializations,
  onLogout,
}) => {

  const isSpecializationDisabled = (specialization) => {
    if (domainFilter === "cse") {
      return specialization === "ECE"; 
    }
    if (domainFilter === "mechanical") {
      return true; 
    }
    if (domainFilter === "ece") {
      return specialization === "DataScience" || specialization === "ComputerScience"; 
    }
    return false; 
  };

  return (
    <div className="filters">
      <label htmlFor="domain">Filter by Domain:</label>
      <select id="domain" value={domainFilter} onChange={onDomainChange}>
        <option value="all">All</option>
        <option value="cse">CSE</option>
        <option value="ece">ECE</option>
        <option value="mechanical">Mechanical</option>
      </select>
      
      <label htmlFor="specialization">Filter by Specialization:</label>
      <select
        id="specialization"
        value={specializationFilter}
        onChange={onSpecializationChange}
      >
        <option value="all">All</option>
        <option 
          value="DataScience" 
          disabled={isSpecializationDisabled("DataScience")}
        >
          Data Science
        </option>
        <option 
          value="ComputerScience" 
          disabled={isSpecializationDisabled("ComputerScience")}
        >
          Computer Science
        </option>
        <option 
          value="ECE" 
          disabled={isSpecializationDisabled("ECE")}
        >
          ECE
        </option>
      </select>

      <button
        onClick={onRecalculateSpecializations}
        className="btn btn-primary ml-2"
      >
        Recalculate Specializations
      </button>
      <button onClick={onLogout} className="btn btn-danger ml-4 logout">
        Logout
      </button>
    </div>
  );
};

export default FilterControls;
