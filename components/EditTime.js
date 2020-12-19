import React, { useState, useEffect } from "react";
import useStore from "../Store/Store";
import { Formik, Form, Field } from "formik";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";

export default function EditTime() {
  const setBeingEditProject = useStore((state) => state.setBeingEditProject);
  const beingEditProject = useStore((state) => state.beingEditProject);
  const updateProject = useStore((state) => state.updateProject);

  const [isVisible, setIsVisible] = useState(false);

  let duration = 0,
    hours = 0,
    minutes = 0;
  if (beingEditProject) {
    duration = beingEditProject.time;
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((duration / (1000 * 60)) % 60);
  }

  useEffect(() => {
    if (beingEditProject) setIsVisible(true);
  }, [beingEditProject]);

  return (
    <>
      {!isVisible ? null : (
        <div className="overlay">
          <div className="overlay-content">
          <h1>Edit time</h1>
          <Formik
            initialValues={{ hours: hours, minutes: minutes }}
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
              const editedProject = { ...beingEditProject, time: newTime };
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
                      <FormErrorMessage>{form.errors.minutes}</FormErrorMessage>
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
                    type="cancel"
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
