import { Box, Button, Group, Notification, TextInput } from "@mantine/core";

import React from "react";
import axios from "axios";
import { useForm } from "@mantine/form";
import {toast} from "react-toastify"

type Props = {};

const Security = (props: Props) => {
  const form = useForm({
    initialValues: {
      password: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },

    validate: {
      password: (value) => (value.length >= 6 ? null : "Şifre çok kısa"),
      newPassword: (value) => (value.length >= 6 ? null : "Şifre çok kısa"),
      newPasswordConfirmation: (value) =>
        value === form.values.newPassword ? "" : "Şifreler eşleşmiyor",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post(`/api/user/change_pass`, {
        data: {
          oldPassword: form.values.password,
          password: form.values.newPassword,
          passwordc: form.values.newPasswordConfirmation,
        },
      })
      toast.success("Şifreniz başarıyla değiştirildi")
      form.values.password = ""
      form.values.newPassword = ""
      form.values.newPasswordConfirmation = ""
    }catch(err){
      console.log("datası hata",err.response.data)
      toast.error(err.response.data.error)
    }
  };

  return (
    <Box sx={{ maxWidth: 300, marginTop: 30 }} mx="auto">
      <form onSubmit={handleSubmit}>
        <TextInput
          withAsterisk
          type="password"
          label="Password"
          placeholder="eski şifreniz"
          {...form.getInputProps("password")}
          style={{ marginBottom: 20 }}
        />
        <TextInput
          withAsterisk
          type="password"
          label="New password"
          placeholder="yeni şifreniz"
          {...form.getInputProps("newPassword")}
          style={{ marginBottom: 20 }}
        />
        <TextInput
          withAsterisk
          type="password"
          label="New password confirmation"
          placeholder="yeni şifreniz"
          {...form.getInputProps("newPasswordConfirmation")}
          style={{ marginBottom: 20 }}
        />

        <Group position="right" mt="md">
          <Button type="submit">Kaydet</Button>
        </Group>
      </form>
    </Box>
  );
};

export default Security;
