import { useForm } from "react-hook-form";

export default function GoalForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("description")} />
      <input {...register("frequencyTarget")} />
      <input {...register("title")} />

      <input type="submit" />
    </form>
  );
}
