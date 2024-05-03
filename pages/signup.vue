<script lang="ts" setup>
import VTextInput from '~/components/common/VTextInput.vue';
import { object, string, ref as yupRef } from "yup";
import { configure } from "vee-validate";
import commonMessage from "~/constants/message";
const toast = useToast()

const togglePassword = ref(false);
const toggleCPassword = ref(false);

const router = useRouter();

const handleSubmit = async (values: any, actions: any) => {
    try {
        const data = {
            phone: values.phone,
            name: values.name,
            email: values.email,
            password: values.password,
            monthly_volume: values.monthlyV,
        }
        const res = await $fetch('/api/auth/signup', {
            method: 'post',
            body: data
        })
        if (res.statusCode == 200) { 
            toast.add({ title: 'User signup successfully!' })    
            router.push('/login');
        }
    } catch (error) {
        console.log("Error: ",error)
    }
};

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true,
});

const schema = object({
    name: string()
        .trim()
        .required(commonMessage.required)
        .min(1)
        .test((value, ctx) => {
            if (!value.match(/^[a-z]*$/)) {
                return ctx.createError({ message: commonMessage.invalidName })
            }
            return true
        }),
    email: string()
        .trim()
        .required(commonMessage.required)
        .email(commonMessage.invalidEmail),
    password: string().required(commonMessage.required).min(8, commonMessage.passwordMin),
    phone: string()
        .required(commonMessage.required)
        .min(8)
        .test((value, ctx) => {
            if (!value.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{1,3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)) {
                return ctx.createError({ message: commonMessage.invalidPhone })
            }
            return true
        }),
    confirmPassword: string()
        .required(commonMessage.required)
        .oneOf([yupRef("password")], commonMessage.passwordConfirm),
});

const initialValues = { name: "", email: "", password: "", phone: "", monthlyV: "<100", confirmPassword: "" };
definePageMeta({
    layout: false,
});
</script>
<template>
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-6 mx-auto">
      <div class="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0 mb-8">
        <div class="space-y-4 md:space-y-6">
          <h1 class="px-6 pt-6 text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Register
          </h1>
          <p class="px-6 text-sm text-gray-600">
            Don't have an account? Create your own <br> account, it
            takes
            less than a minute
          </p>
          <VeeForm
            class="space-y-4 md:space-y-6"
            :validation-schema="schema"
            :initial-values="initialValues"
            @submit="handleSubmit"
          >
            <div class="px-6">
              <VTextInput
                type="text"
                name="name"
                label="What should we call
                                you?"
                placeholder="Enter your name"
              />
            </div>
            <div class="px-6">
              <VTextInput
                type="text"
                name="phone"
                label="Phone number"
                placeholder="Enter phone number"
              />
            </div>
            <div class="px-6">
              <VTextInput
                type="email"
                name="email"
                label="Email address"
                placeholder="Enter your email"
              />
            </div>
            <div class="px-6">
              <VeeField
                v-slot="{ field, meta, errors }"
                name="monthlyV"
              >
                <label
                  for="monthlyV"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Monthly
                  Volume</label>
                <select
                  id="monthlyV"
                  v-bind="field.value"
                  :class="`rounded-lg sm:text-sm border block w-full p-2 ${meta.touched ? meta.valid ? 'bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500' : 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-700 focus:ring-primary focus:border-primary'}`"
                >
                  <option
                    class="p-6"
                    selected
                  >
                    Select your monthly volume
                  </option>
                  <option
                    class="p-6"
                    value="100"
                  >
                    100
                  </option>
                  <option
                    class="p-6"
                    value="100-500"
                  >
                    100-500
                  </option>
                  <option
                    class="p-6"
                    value="500"
                  >
                    >500
                  </option>
                </select>
                <VeeErrorMessage
                  name="monthlyV"
                  as="p"
                  class="mt-2 text-sm text-red-600"
                />
              </VeeField>
            </div>
            <div class="px-6 relative">
              <VTextInput
                :type="togglePassword ? 'text' : 'password'"
                name="password"
                label="Password"
                placeholder="••••••••"
              />
              <img
                v-if="togglePassword == false"
                src="~/assets/icons/ic-view-grey.svg"
                alt=""
                class="toggle-password w-[18px] h-[18px] absolute right-8 top-9"
                @click="() => togglePassword = true"
              >

              <img
                v-if="togglePassword === true"
                src="~/assets/icons/ic-eye-closed-grey.svg"
                alt=""
                class="toggle-password w-[18px] h-[18px] absolute right-8 top-9"
                @click="() => togglePassword = false"
              >
            </div>
            <div class="px-6 relative">
              <VTextInput
                :type="toggleCPassword ? 'text' : 'password'"
                name="confirmPassword"
                label="Confirm
                                password"
                placeholder="••••••••"
              />
              <img
                v-if="toggleCPassword == false"
                src="~/assets/icons/ic-view-grey.svg"
                alt=""
                class="toggle-password w-[18px] h-[18px] absolute right-8 top-9"
                @click="() => toggleCPassword = true"
              >

              <img
                v-if="toggleCPassword === true"
                src="~/assets/icons/ic-eye-closed-grey.svg"
                alt=""
                class="toggle-password w-[18px] h-[18px] absolute right-8 top-9"
                @click="() => toggleCPassword = false"
              >
            </div>
            <div class="flex items-start px-6">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  name="terms"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                >
              </div>
              <div class="ml-3 text-sm">
                <label
                  for="terms"
                  class="font-light text-gray-500"
                >I accept the <a
                  class="font-medium text-primary hover:underline"
                  href="#"
                >Terms and
                  Conditions</a></label>
              </div>
            </div>
            <div class="px-6">
              <button
                type="submit"
                class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create
                an account
              </button>
            </div>
            <p class="text-sm font-light text-gray-500 px-6 pb-6 before:text-center">
              Already have an account? <NuxtLink
                to="/login"
                class="font-medium text-primary hover:underline"
              >
                Login here
              </NuxtLink>
            </p>
          </VeeForm>
        </div>
      </div>
    </div>
    <UNotifications />
  </section>
</template>
