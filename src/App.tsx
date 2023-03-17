import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';


const validationSchema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    age: z.number().min(10, { message: 'lower 10' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

function App() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);
  return (
      <form onSubmit={handleSubmit(onSubmit)} >
          <input {...register('name')} />
          {errors.name?.message &&
              <p>{errors.name?.message}</p>
          }
          <input type="number" {...register('age', { valueAsNumber: true })} />
          {errors.age?.message &&
              <p>{errors.age?.message}</p>
          }
          <input type="submit" />
      </form>
  );
}

export default App;
