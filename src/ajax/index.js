"use strict";

import { baseInstance } from "./axios";
import IMask from "imask";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#form");
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");
  const messageInput = document.querySelector("#message");

  const phoneMask = new IMask(phoneInput, {
    mask: "+{375}(00)000-00-00",
  });

  form.addEventListener("submit", sendForm);

  async function sendForm(event) {
    event.preventDefault();

    const wrongFields = validateForm(form);

    if (wrongFields === 0) {
      try {
        const { data } = await baseInstance.post("/form", {
          inputs: {
            nameInput: nameInput.value,
            emailInput: emailInput.value,
            phoneInput: phoneMask.unmaskedValue,
            messageInput: messageInput.value,
          },
        });

        if (data.status === "success") {
          form.reset();
          alert(data.msg);
        } else {
          alert("Unexpected Error: Please, try again later");
        }
      } catch (e) {
        console.log(e);
        alert("Unexpected Error: Please, try again later");
      }
    } else {
      alert("All fields are requared!");
    }
  }

  function validateForm(form) {
    let wrongFields = 0;
    const formReq = document.querySelectorAll("._req");

    Array.from(formReq).map(input => {
      formRemoveError(input);

      if (input.id === "email") {
        if (!validateEmail(input.value)) {
          formAddError(input);
          wrongFields++;
        }
      }

      if (input.id === "phone") {
        if (!phoneMask.masked.isComplete) {
          formAddError(input);
          wrongFields++;
        }
      }

      if (input.value === "") {
        formAddError(input);
        wrongFields++;
      }
    });
    return wrongFields;
  }

  function formAddError(input) {
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.classList.remove("_error");
  }

  function validateEmail(email) {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    console.log(EMAIL_REGEXP.test(email));
    return EMAIL_REGEXP.test(email);
  }
});
