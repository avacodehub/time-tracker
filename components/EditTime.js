import React, { useState, useEffect, useCallback } from "react";
import useStore from "../Store/Store";
import { Formik, Form, Field } from "formik";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Text
} from "@chakra-ui/react";

export default function EditTime() {
  const setBeingEditProject = useStore((state) => state.setBeingEditProject);
  const beingEditProject = useStore((state) => state.beingEditProject);
  const updateProject = useStore((state) => state.updateProject);

  const [isVisible, setIsVisible] = useState(false);

  let duration = 0,
    hours = 0,
    minutes = 0,
    name = "",
    customId = "";
  if (beingEditProject) {
    duration = beingEditProject.time;
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((duration / (1000 * 60)) % 60);

    name = beingEditProject.name ? beingEditProject.name : ""
    customId = beingEditProject.customId ? beingEditProject.customId : ""
  }

  useEffect(() => {
    if (beingEditProject) setIsVisible(true);
  }, [beingEditProject]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const escFunction = useCallback((event) => {
    if(event.keyCode === 27) {
      handleCancel();
    }
  }, []);
  function handleCancel() {
    setBeingEditProject(null);
    setIsVisible(false);
  }

  const handleClickOverlay = (event) => {
    if (event.target.id === "edit-overlay") {
      handleCancel()
    }
  };

  return (
    <>
      {!isVisible ? null : (
        <div id="edit-overlay" className="overlay" onClick={handleClickOverlay}>
          <div className="overlay-content">
            <Text fontSize="lg" align="center">Manage Project/Activity</Text>
            <Formik
              initialValues={{
                hours: hours,
                minutes: minutes,
                name: name,
                customId: customId,
              }}
              validate={(values) => {
                const errors = {};
                if (values.minutes > 59) {
                  errors.minutes = "Minutes must be 0 - 59";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                const newTime =
                  values.hours * 60 * 60 * 1000 + values.minutes * 60 * 1000;
                const editedProject = {
                  ...beingEditProject,
                  time: newTime,
                  name: values.name,
                  customId: values.customId,
                };
                updateProject(editedProject);

                setSubmitting(false);
                setBeingEditProject(null);
                setIsVisible(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field type="number" name="hours">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.hours && form.touched.hours}
                      >
                        <FormLabel htmlFor="hours">Hours</FormLabel>
                        <Input
                          {...field}
                          id="hours"
                          placeholder="Hours"
                          autoComplete="off"
                        />
                        <FormErrorMessage>{form.errors.hours}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field type="number" name="minutes">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.minutes && form.touched.minutes}
                      >
                        <FormLabel htmlFor="minutes">Minutes</FormLabel>
                        <Input
                          {...field}
                          id="minutes"
                          placeholder="Minutes"
                          autoComplete="off"
                        />
                        <FormErrorMessage>
                          {form.errors.minutes}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field type="text" name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                          {...field}
                          id="name"
                          placeholder="Name"
                          autoComplete="off"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field type="text" name="customId">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.customId && form.touched.customId
                        }
                      >
                        <FormLabel htmlFor="customId">Custom ID</FormLabel>
                        <Input
                          {...field}
                          id="customId"
                          placeholder="Custom ID"
                          autoComplete="off"
                        />
                        <FormErrorMessage>
                          {form.errors.customId}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex justifyContent="flex-end" mt={4}>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      isDisabled={isSubmitting}
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={handleCancel}
                      colorScheme="red"
                      variant="outline"
                      isDisabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
