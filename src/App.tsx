import "./App.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";

import { useState } from "react";

const schema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .min(8, "name must be at least 8 characters long")
    .max(30, "name must be maximum 30 characters long")
    .test(
      "includes space",
      "You should include both firstname and lastname",
      (value) => value?.includes(" ")
    ),
  cardNumber: yup
    .string()
    .required("card number is required")
    .min(19, "card number must be 16 characters long"),
  mm: yup
    .string()
    .required("mm is required")
    .min(2, "month must be 2 characters long")
    .test("month validation", "month must be valid", (value) => {
      if (value) {
        return parseInt(value) > 0 && parseInt(value) <= 12;
      }
    }),
  yy: yup
    .string()
    .required("yy is required")
    .min(2, "month must be 2 characters long")
    .test("year validation", "year must be valid", (value) => {
      if (value) {
        return parseInt(value) >= 24 && parseInt(value) <= 40;
      }
    }),
  cvc: yup
    .string()
    .required("cvc is required")
    .min(3, "cvc must be 3 characters long"),
});

type Inputs = {
  name: string;
  cardNumber: string;
  mm: string;
  yy: string;
  cvc: string;
};

function App() {
  const [showForm, setShowForm] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setShowForm(false);
  };

  const name = watch("name");
  const cardNumber = watch("cardNumber");
  const mm = watch("mm");
  const yy = watch("yy");
  const cvc = watch("cvc");

  return (
    <>
      {showForm ? (
        <div>
          <div>
            <h2>{name || "JANE APPLESEED"}</h2>
            <h2>{cardNumber || "0000 0000 0000 0000"}</h2>
            <h2>
              {mm || "00"} / {yy || "00"}
            </h2>
            <h2>{cvc || "000"}</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name">
                Cardholder Name
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder="e.g. Jane Appleseed"
                />
              </label>
              {errors.name ? <p>{errors.name.message}</p> : null}
            </div>
            <div>
              <label htmlFor="cardNumber">
                Card Number
                <InputMask
                  type="text"
                  id="cardNumber"
                  {...register("cardNumber")}
                  placeholder="e.g. 1234 5678 9123 0000"
                  mask="9999 9999 9999 9999"
                  maskChar=""
                />
              </label>
              {errors.cardNumber ? <p>{errors.cardNumber.message}</p> : null}
            </div>
            <div>
              <label htmlFor="mm">
                Exp. Date (MM/YY)
                <InputMask
                  type="text"
                  id="mm"
                  {...register("mm")}
                  placeholder="MM"
                  mask="99"
                  maskChar=""
                />
              </label>
              {errors.mm ? <p>{errors.mm.message}</p> : null}
            </div>
            <div>
              <label htmlFor="yy">
                Exp. Date (MM/YY)
                <InputMask
                  type="text"
                  id="yy"
                  {...register("yy")}
                  placeholder="YY"
                  mask="99"
                  maskChar=""
                />
                {errors.yy ? <p>{errors.yy.message}</p> : null}
              </label>
            </div>
            <div>
              <label htmlFor="cvc">
                CVC
                <InputMask
                  type="text"
                  id="cvc"
                  {...register("cvc")}
                  placeholder="CVC"
                  mask="999"
                  maskChar=""
                />
              </label>
              {errors.cvc ? <p>{errors.cvc.message}</p> : null}
            </div>
            <button>Confirm</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Thank You</h1>
          <button
            onClick={() => {
              setShowForm(true);
            }}
          >
            Go back
          </button>
        </div>
      )}
    </>
  );
}

export default App;
