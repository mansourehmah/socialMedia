import { AxiosError, type AxiosResponse } from "axios";
import { useState, type SubmitEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../lib";
import type { ResponseType, SignUpType } from "../types";
import { AuthLayout } from "../components/layout";
import { Button, Input } from "../components/ui";

type SignUpPayload = {
  name: string;
  email: string;
  password: string;
};

export const SignUp = () => {
  const [formData, setFormData] = useState<SignUpPayload>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Missing fields");
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post<
        SignUpPayload,
        AxiosResponse<ResponseType<SignUpType>>
      >("/api/authentication/register", formData);

      if (res.data.data) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.error);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout rightImage="/images/signup.png">
      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your email below to create your account
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              label="Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={loading}
            />
            <Input
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={loading}
            />
            <Input
              label="Password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <Button>{loading ? "Creating account..." : "Create Account"}</Button>

          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-600 underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};
