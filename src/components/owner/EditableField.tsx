import React from "react";
import { TextField, Typography, type TextFieldProps, type TypographyProps } from "@mui/material";
import { Controller, type Control } from "react-hook-form";

interface EditableFieldProps {
    name: string;
    control: Control<any>;
    isEditing: boolean;
    value?: string | null;
    emptyText?: string;
    typographyProps?: TypographyProps;
    textFieldProps?: TextFieldProps;
}

export const EditableField: React.FC<EditableFieldProps> = ({
    name,
    control,
    isEditing,
    value,
    emptyText = "Chưa cập nhật",
    typographyProps,
    textFieldProps,
}) => {
    if (!isEditing) {
        return (
            <Typography {...typographyProps}>
                {value || emptyText}
            </Typography>
        );
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    {...textFieldProps}
                    fullWidth
                    size={textFieldProps?.size || "small"}
                    error={!!error}
                    helperText={error?.message}
                />
            )}
        />
    );
};