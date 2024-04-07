import { FormTemplate } from "@/components/form/FormTemplate";
import { Metadata } from "next";


export const metadata : Metadata = {
	title: "Form",
};

export default function FormPage() {
	return <FormTemplate />;
}