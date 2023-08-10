import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import s from "./register-form.module.scss";
import { registerSchema } from "@/src/common/schemas/register-schema";
import { Card } from "@/src/components/ui/card-temporary";
import { Typography } from "@/src/components/ui/typography";
import {
  ControlledCheckbox,
  ControlledTextField,
} from "@/src/components/ui/controlled";
import { Button } from "@/src/components/ui/button";
import GoogleIcon from "@/src/assets/icons/google-icon";
import GithubIcon from "@/src/assets/icons/github-icon";
import Link from "next/link";
import { DevTool } from "@hookform/devtools";
import { useRouter } from "next/router";

export type RegisterFormType = z.infer<typeof registerSchema>;

type RegisterFormPropsType = {
  onSubmitHandler: (data: RegisterFormType) => void;
};

export const RegisterForm = (props: RegisterFormPropsType) => {
  const { onSubmitHandler } = props;
  const router = useRouter();

  const { control, handleSubmit, formState } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      terms: false,
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormType) => {
    onSubmitHandler(data);
  });

  return (
    <Card className={s.card}>
      <div className={s.content}>
        <Typography variant={"h1"} className={s.title}>
          Sign Up
        </Typography>
        <div className={s.authIcons}>
          <Link href={"/google"}>
            {/*TODO link*/}
            <GoogleIcon />
          </Link>
          <Link href={"/github"}>
            {/*TODO link*/}
            <GithubIcon />
          </Link>
        </div>
        <form onSubmit={onSubmit} className={s.form}>
          <DevTool control={control} />
          <ControlledTextField
            control={control}
            name={"username"}
            label={"Username"}
            className={s.field}
          />
          <ControlledTextField
            control={control}
            name={"email"}
            label={"Email"}
            className={s.field}
          />
          <ControlledTextField
            control={control}
            name={"password"}
            type={"password"}
            label={"Password"}
            className={s.field}
          />
          <ControlledTextField
            control={control}
            name={"passwordConfirm"}
            type={"password"}
            label={"Password confirmation"}
            className={s.field}
          />
          <div className={s.terms}>
            <ControlledCheckbox
              control={control}
              name={"terms"}
              label={
                <Typography variant={"small"} className={s.termsRow}>
                  I agree to the&nbsp;
                  <Link href={"/terms"} className={s.termsLink}>
                    Terms of Service
                  </Link>
                  &nbsp;and&nbsp;
                  <Link href={"/policy"} className={s.termsLink}>
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
          </div>
          <Button
            type={"submit"}
            fullWidth
            className={s.registerBtn}
            // disabled={!formState.isValid}
            //TODO disable
          >
            <Typography variant={"h3"}>Sign Up</Typography>
          </Button>
        </form>
        <Typography variant={"regular16"} className={s.subtitle}>
          Do you have an account?
        </Typography>
        <Button as={"a"} variant={"text"} onClick={() => router.push("/")}>
          Sign in
        </Button>
      </div>
    </Card>
  );
};
