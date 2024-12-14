import React, { useState } from "react";

const AdminGroundForm = () => {
  const [formData, setFormData] = useState({
    city: "",
    country: "",
    state: "",
    district: "",
    area: "",
    groundName: "",
    price: "",
    description: "",
    photo: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.district) newErrors.district = "District is required.";
    if (!formData.area) newErrors.area = "Area is required.";
    if (!formData.groundName) newErrors.groundName = "Ground Name is required.";
    if (!formData.price || isNaN(formData.price))
      newErrors.price = "Valid price is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.photo)
      newErrors.photo = "Photo is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });

      console.log("Form submitted successfully", formData);
      // Add API submission logic here
      alert("Form submitted successfully!");
      setFormData({
        city: "",
        country: "",
        state: "",
        district: "",
        area: "",
        groundName: "",
        price: "",
        description: "",
        photo: null,
      });
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Add Ground Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <div>
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
          {errors.country && <p className="error">{errors.country}</p>}
        </div>

        <div>
          <label>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
          {errors.state && <p className="error">{errors.state}</p>}
        </div>

        <div>
          <label>District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
          />
          {errors.district && <p className="error">{errors.district}</p>}
        </div>

        <div>
          <label>Area</label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
          />
          {errors.area && <p className="error">{errors.area}</p>}
        </div>

        <div>
          <label>Ground Name</label>
          <input
            type="text"
            name="groundName"
            value={formData.groundName}
            onChange={handleInputChange}
          />
          {errors.groundName && <p className="error">{errors.groundName}</p>}
        </div>

        <div>
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div>
          <label>Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
          />
          {errors.photo && <p className="error">{errors.photo}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminGroundForm;
