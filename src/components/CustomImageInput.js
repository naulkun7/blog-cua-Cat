// components/CustomImageInput.js

import React, { forwardRef } from "react";
import { FormField } from "@sanity/base/components";
import { TextInput, Button, Stack, Text } from "@sanity/ui";
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent";

const createPatchFrom = (value) =>
  PatchEvent.from(value === "" ? unset() : set(value));

const MAX_FILE_SIZE = 500 * 1024; // 500KB

export const CustomImageInput = React.forwardRef((props, ref) => {
  const { type, onChange, value } = props;

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      alert("File is too large. The file size must be less than 500KB.");
      return;
    }
    // Handle file upload logic here (e.g., uploading to Sanity)
    // Once uploaded, you should call onChange with a patch event containing the image reference
  };

  return (
    <FormField
      label={type.title}
      description={type.description}
      __unstable_markers={props.markers}
      presence={props.presence}
    >
      <Stack space={3}>
        {value && <Text>Current file: {value.originalFilename}</Text>}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            ref={ref}
          />
        </div>
      </Stack>
    </FormField>
  );
});
