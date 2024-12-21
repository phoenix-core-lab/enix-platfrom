"use client";

import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { useCookies } from "react-cookie";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

interface FormElements extends HTMLFormControlsCollection {
  phone: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
  newPass: HTMLInputElement;
  resetPhone: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const SigninForm = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies([
    "secretToken",
    "phoneNumber",
  ]);
  // const [open, setOpen] = React.useState(false);
  const open = false;
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = React.useState(false);
  // const [isOpenSendPassword, setIsOpenSendPassword] = React.useState(true);
  const isOpenSendPassword = true;
  const [phoneNum, setPhoneNum] = React.useState("+998");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    console.log(cookies, open);
    if (!inputValue.startsWith("+998")) {
      setPhoneNum("+998");
      return;
    }

    if (inputValue.length > 13) {
      return;
    }

    setPhoneNum(inputValue);
  };

  const signIn = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formElements = event.currentTarget.elements;

    axios
      .post(process.env.NEXT_PUBLIC_APP_API_URL + "/auth/login", {
        phone_number: formElements.phone.value,
        password: formElements.password.value,
      })
      .then((res) => {
        const token = res.data.access_token;
        if (token) {
          setCookie("phoneNumber", phoneNum, { path: "/" });
          setCookie("secretToken", token, { path: "/" });
          router.push("/dashboard");
        } else {
          toast.error("Токенни олиш мумкин бўлмади.");
        }
      })
      .catch((err) => {
        console.error("Ошибка авторизации:", err);
        toast.error(
          "Нотўғри логин ёки пароль! Ёки ҳали аккаунтни фаоллаштирмагансиз."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // const handleSendPassword = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setPhoneNum(e.currentTarget.elements.resetPhone.value);
  //   axios
  //     .post("http://192.168.1.182:40455/api/auth/send-phone-code", {
  //       phoneNumber: e.currentTarget.elements.resetPhone.value,
  //     })
  //     .then(() => {
  //       setIsOpenSendPassword(false);
  //       setIsLoading(false);
  //     })
  //     .catch(() => {
  //       toast.error("Телефон рақами нотўғри киритилган!");
  //       setIsLoading(false);
  //     });
  // };

  // const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   axios
  //     .post("http://192.168.1.182:40455/api/auth/change-password", {
  //       phoneNumber: phoneNum,
  //       newPassword: e.currentTarget.elements.newPass.value,
  //       code: e.currentTarget.elements.checkPass.value,
  //     })
  //     .then(() => {
  //       setIsOpenChangePassword(false);
  //       setIsOpenSendPassword(true);
  //       setIsLoading(false);
  //       toast.success("Пароль успешно изменен!");
  //     })
  //     .catch(() => {
  //       setIsLoading(false);
  //       toast.error("Код подтверждения введен неправильно!");
  //     });
  // };

  return (
    <CssVarsProvider defaultMode="dark">
      <CssBaseline />
      <ToastContainer />
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
                  ENIX AI
                </Typography>
                <Typography level="body-sm">
                  Янги фойдаланувчи?{" "}
                  <Link href="/signup" level="title-sm">
                    Рўйхатдан ўтиш
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            <Divider>или</Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              {isOpenChangePassword ? (
                <>
                  {isOpenSendPassword ? (
                    // <form onSubmit={(e) => handleSendPassword(e)}>
                    <form>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography level="body-sm">Парольни тиклаш</Typography>
                        <Link
                          level="title-sm"
                          onClick={() => setIsOpenChangePassword(false)}
                          sx={{ fontWeight: "400" }}
                        >
                          Оркага қайтиш
                        </Link>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "15px",
                        }}
                      >
                        <FormControl required>
                          <FormLabel>Телефон рақами</FormLabel>
                          <Input type="tel" name="resetPhone" />
                        </FormControl>
                        <Box>
                          <Button type="submit" loading={isLoading} fullWidth>
                            Отправить
                          </Button>
                        </Box>
                      </Box>
                    </form>
                  ) : (
                    // <form onSubmit={(e) => handleChangePassword(e)}>
                    <form>
                      <Typography level="body-sm">
                        Код подтверждения отправлен на Телефон рақами -{" "}
                        <b>{phoneNum}</b>
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "15px",
                        }}
                      >
                        <FormControl sx={{ display: "none" }}>
                          <FormLabel>Старый пароль</FormLabel>
                          <Input type="text" name="oldPass" />
                        </FormControl>
                        <FormControl required>
                          <FormLabel>Новый пароль</FormLabel>
                          <Input type="text" name="newPass" />
                        </FormControl>
                        <FormControl required>
                          <FormLabel>Код подтверждения</FormLabel>
                          <Input type="text" name="checkPass" />
                        </FormControl>
                        <Box>
                          <Button type="submit" loading={isLoading} fullWidth>
                            Отправить
                          </Button>
                        </Box>
                      </Box>
                    </form>
                  )}
                </>
              ) : (
                <form
                  onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                    signIn(event);
                  }}
                >
                  <FormControl required>
                    <FormLabel>Телефон рақами</FormLabel>
                    <Input
                      type="text"
                      name="phone"
                      value={phoneNum}
                      onChange={handlePhoneChange}
                    />
                  </FormControl>
                  <FormControl required>
                    <FormLabel>Пароль</FormLabel>
                    <Input type="password" name="password" />
                  </FormControl>
                  <Stack gap={4} sx={{ mt: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        size="sm"
                        label="Мени эслаб қолиш"
                        name="persistent"
                      />
                      <Link
                        level="title-sm"
                        href="/signup"
                        sx={{ fontWeight: "400" }}
                      >
                        Парольни унутдингизми?
                      </Link>
                    </Box>
                    <Button
                      type="submit"
                      loading={isLoading}
                      fullWidth
                      // sx={{
                      //   bgcolor: "#000",
                      //   "&:hover": {
                      //     bgcolor: "#00000095",
                      //   },
                      // }}
                    >
                      Кириш
                    </Button>
                  </Stack>
                </form>
              )}
            </Stack>
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

export default SigninForm;