import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    houseNumber: "",
    street: "",
    city: "",
    district: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("❌ Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:8080/api/users/register", formData);

      if (response.status === 200 || response.status === 201) {
        toast.success("✅ Registration successful!");

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          address: "",
          houseNumber: "",
          street: "",
          city: "",
          district: "",
        });

        // Redirect to login after 2 sec
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("❌ Email already registered.");
        } else {
          toast.error(`❌ ${error.response.data.message || "Registration failed"}`);
        }
      } else {
        toast.error("❌ Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <ToastContainer />
      <div className="register-box">
        <h2 className="form-title">Sign up to From Grove</h2>
        <p className="form-subtitle">Please enter your details below</p>

        <form onSubmit={handleSubmit} className="register-form">
          {/* Row 1 */}
          <div className="form-row">
            <div className="input-group">
              <label>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="input-group">
              <label>Second Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Re-enter Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
          </div>

          {/* Row 4 */}
          <div className="form-row">
            <div className="input-group half-width">
              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>
          </div>

          {/* Row 5 */}
          <div className="form-row">
            <div className="input-group">
              <input type="text" name="houseNumber" placeholder="House Number" value={formData.houseNumber} onChange={handleChange} />
            </div>
          </div>

          {/* Row 6 */}
          <div className="form-row">
            <div className="input-group">
              <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
            </div>
          </div>

          {/* Row 7 */}
          <div className="form-row">
            <div className="input-group">
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            </div>
            <div className="input-group">
              <select name="district" value={formData.district} onChange={handleChange} required>
                <option value="">Select District</option>
                <option value="District1">District 1</option>
                <option value="District2">District 2</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="form-row">
            <button type="submit" className="register-button" disabled={loading}>
              {loading ? "Submitting..." : "Register"}
            </button>
          </div>

          {/* Already have account */}
          <p className="form-subtitle" style={{ marginTop: "10px", textAlign: "center" }}>
            Already have an account? <a href="/login" className="login-link">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;