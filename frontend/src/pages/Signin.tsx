import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/auth/AuthLayout";
import authService from "@/features/services/authService";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authService.signIn(formData);
      navigate("/");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      isLoading={loading}
      buttonText="Sign in"
      onSubmit={handleSubmit}
      form={
        <>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </>
      }
      footer={
        <>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-green-600 hover:underline">
                Create one
              </Link>
            </p>
          </div>
          {/* <div className="flex justify-between text-sm">
            <Link
              to="/forgot-password"
              className="text-green-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div> */}
          <p className="text-xs text-center text-gray-500">
            Click "Sign in" to agree to Medium's{" "}
            <Link to="" className="text-green-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and acknowledge that Medium's{" "}
            <Link to="" className="text-green-600 hover:underline">
              Privacy Policy
            </Link>{" "}
            applies to you.
          </p>
        </>
      }
    />
  );
}
