import { FormTemplate } from "@/components/form/FormTemplate";
import { Metadata } from "next";


export const metadata : Metadata = {
	title: "予定作成フォーム",
};

export default function FormPage() {
	return <FormTemplate />;
}