import { AxiosError, type AxiosResponse } from "axios";
import { useState, type SubmitEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../lib";
import { getAxiosErrorMessage } from "../lib/errors";
import type { ResponseType, SignInType } from "../types";
import { Button, Input } from "../components/ui";
import { AuthLayout } from "../components/layout";

type SignInPayload = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const [formData, setFormData] = useState<SignInPayload>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Missing fields");
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post<
        SignInPayload,
        AxiosResponse<ResponseType<SignInType>>
      >("/api/authentication/login", formData);

      if (res.data.data) {
        const target = res.data.data.url || "/";
        toast.success(res.data.message);
        if (/^https?:\/\//i.test(target)) {
          window.location.assign(target);
        } else {
          navigate(target);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(
          getAxiosErrorMessage(error, "Login failed"),
        );
      } else {
        toast.error(
          getAxiosErrorMessage(error, "Cannot reach server. Is the API up?"),
        );
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout rightImage="/images/login.png">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcomeeee back
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Login to your Socially account
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
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

        <Button>{loading ? "Logging in..." : "Login"}</Button>

        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/sign-up" replace className="text-blue-600 underline">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
