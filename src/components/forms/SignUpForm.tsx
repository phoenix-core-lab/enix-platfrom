"use client";

import * as React from "react";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { Link } from "@/i18n/routing";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { useRouter } from "@/i18n/routing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import LanguageSwitcher from "../dashboard/LanguageSwitcher";
import { useTranslations } from "next-intl";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  phone: HTMLInputElement;
  password: HTMLInputElement;
  code: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#007bff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBg: "#1e88e5",
        },
      },
    },
  },
});

const SignUpForm = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false); // изменено название переменной на isRegistered
  const [phoneNum, setPhoneNum] = React.useState("+998");
  const [isMounted, setIsMounted] = React.useState(false);
  const t = useTranslations("Register");
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (!inputValue.startsWith("+998")) {
      setPhoneNum("+998");
      return;
    }

    if (inputValue.length > 13) {
      return;
    }

    setPhoneNum(inputValue);
  };

  const signUp = (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formElements = event.currentTarget.elements as FormElements;
    axios
      .post(process.env.NEXT_PUBLIC_APP_API_URL + "/auth/register", {
        fullname: formElements.name.value,
        phone_number: formElements.phone.value,
        password: formElements.password.value,
      })
      .then((res) => {
        setCookie("secretToken", res.data.access_token);
        setIsRegistered(true);
      })
      .catch((err) => {
        console.error(err);
        console.log(process.env.NEXT_PUBLIC_APP_API_URL);
        toast.error("Бундай фойдаланувчи аллақачон мавжуд!");
      });
    setIsLoading(false);
  };

  const checkPhoneSmsCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formElements = event.currentTarget.elements as FormElements;
    axios
      .post(
        process.env.NEXT_PUBLIC_APP_API_URL + "/auth/verify-phone-code",
        {
          code: formElements.code.value,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.secretToken}`,
          },
        }
      )
      .then(() => {
        router.push("/dashboard");
        setCookie("phoneNumber", phoneNum, { path: "/" });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Нотўғри тасдиқлаш коди!");
      });
    setIsLoading(false);
  };

  return (
    <CssVarsProvider
      disableTransitionOnChange
      defaultMode="dark"
      disableNestedContext
      theme={theme}
    >
      <CssBaseline />
      <ToastContainer theme="dark" />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        className="poppins"
        sx={{
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
        }}
      >
        <Box padding={2}>
          <LanguageSwitcher />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "md",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 0 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  ENIX AI!
                </Typography>
                <Typography level="body-sm">
                  {t("alreadyHaveAccount")}
                  <Link href="/signin">
                    <Typography color="primary">{t("login")}</Typography>
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            <Divider>{t("or")}</Divider>
            {!isRegistered ? (
              <Stack gap={4} sx={{ mt: 2 }}>
                <form
                  onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                    signUp(event);
                  }}
                >
                  <FormControl required>
                    <FormLabel>{t("name")}</FormLabel>
                    <Input type="text" name="name" />
                  </FormControl>
                  <FormControl required>
                    <FormLabel>{t("telphoneNumber")}</FormLabel>
                    <Input
                      type="phone"
                      name="phone"
                      value={phoneNum}
                      onChange={handlePhoneChange}
                    />
                  </FormControl>
                  <FormControl required>
                    <FormLabel>{t("password")}</FormLabel>
                    <Input type="password" name="password" />
                  </FormControl>
                  <Stack gap={4} sx={{ mt: 2 }}>
                    <Button type="submit" loading={isLoading} fullWidth>
                      {t("register")}
                    </Button>
                  </Stack>
                </form>
              </Stack>
            ) : (
              <Stack gap={4} sx={{ mt: 2 }}>
                <form
                  onSubmit={(event) => {
                    checkPhoneSmsCode(event);
                  }}
                >
                  <FormControl required>
                    <FormLabel>{t("confirmCode")}</FormLabel>
                    <Input
                      type="number"
                      name="code"
                      autoComplete="off"
                      onFocus={(e) => (e.target.value = "")}
                    />
                  </FormControl>
                  <Stack gap={4} sx={{ mt: 2 }}>
                    <Button
                      color="primary"
                      type="submit"
                      loading={isLoading}
                      fullWidth
                    >
                      {t("registration")}
                    </Button>
                  </Stack>
                </form>
              </Stack>
            )}
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © ENIX & Phoenix Core Lab {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
          },
        })}
      />
    </CssVarsProvider>
  );
};

export default SignUpForm;
