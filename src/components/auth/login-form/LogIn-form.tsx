import React from "react";
import s from "./login-form.module.scss";
import { Typography } from "../../ui/typography";
import Link from "next/link";
import { Button } from "../../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import GoogleIcon from "@/src/assets/icons/google-icon";
import GithubIcon from "@/src/assets/icons/github-icon";
import { ControlledTextField } from "../../ui/controlled";
import { logInSchema } from "@/src/common/schemas/logIn-schema";
import { useRouter } from "next/router";

type FormDataType = z.infer<typeof logInSchema>;

export const LogInform: React.FC = () => {
  const { control, handleSubmit } = useForm<FormDataType>({
    resolver: zodResolver(logInSchema),
  });
  const router = useRouter();

  const submitData = (data: FormDataType) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(submitData)} className={s.divWrap}>
      <Typography variant="h1">Sing In</Typography>
      <div className={s.oauthWrap}>
        <Link href={"/google"}>
          <GoogleIcon />
        </Link>
        <Link href={"/github"}>
          <GithubIcon />
        </Link>
      </div>
      <ControlledTextField
        control={control}
        name="email"
        label="Email"
        className={s.controlTextField}
        fullWidth
      />

      <ControlledTextField
        control={control}
        name="password"
        label="Password"
        className={s.controlTextField}
        fullWidth
      />
      <div className={s.wrapLinkForgotPass}>
        <Button variant="text">
          <Typography variant="medium14" className={s.linkForgotPass}>
            Forgot Password
          </Typography>
        </Button>
      </div>
      <Button type="submit" variant="primary" fullWidth={true}>
        <Typography variant="bold16">Sing In</Typography>
      </Button>
      <Typography variant="regular16">Don’t have an account?</Typography>
      <Button variant="link" onClick={() => router.push("/auth/sign-up")}>
        <Typography variant="regular16" className={s.linkSingUP}>
          Sing Up
        </Typography>
      </Button>
    </form>
  );
};
