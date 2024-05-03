<script lang="ts" setup>
import VTextInput from '~/components/common/VTextInput.vue';
import { object, string, ref as yupRef } from "yup";
import { configure } from "vee-validate";
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created
const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated, loading } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const router = useRouter();

const togglePassword = ref(false);
const rememberUser = ref(false);
const atttempt = ref(false);

const existingEmail = async (value: any) => {
  const result = false //await $fetch("/api/checkemail?email=" + value);
  return result ? true : false;
};

const handleSubmit = async (values: any, actions: any) => {
  const data = {
    email: values.email,
    password: values.password,
    rememberUser: rememberUser.value,
  }
  atttempt.value = true;
  await authenticateUser(data); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push('/');
  }
  // actions.resetForm();
};

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
});

const schema = object({
  email: string()
    .required()
    .email()
    .test(
      "email-is-taken",
      "Email is already taken",
      async (value: any) => !(await existingEmail(value))
    )
    .label("This"),
  password: string().required().min(8).label("This"),
});

const initialValues = { email: "", password: "" };
definePageMeta({
  layout: false,
});
</script>
<template>
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <!-- <img class="w-[250px] h-[35px] mr-2 mb-3" src="/formulir-logo.png" alt="logo"> -->
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <div
            v-if="atttempt && !authenticated && !loading"
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            Email or Password is not correct. Please try again
          </div>
          <VeeForm
            class="space-y-4 md:space-y-6"
            :validation-schema="schema"
            :initial-values="initialValues"
            @submit="handleSubmit"
          >
            <VTextInput
              type="email"
              name="email"
              label="Your email"
              placeholder="Enter your email"
            />
            <div class="relative">
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
                class="toggle-password w-[18px] h-[18px] absolute right-2 top-9"
                @click="() => togglePassword = true"
              >

              <img
                v-if="togglePassword === true"
                src="~/assets/icons/ic-eye-closed-grey.svg"
                alt=""
                class="toggle-password w-[18px] h-[18px] absolute right-2 top-9"
                @click="() => togglePassword = false"
              >
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="rememberUser"
                    v-model="rememberUser"
                    name="rememberUser"
                    aria-describedby="rememberUser"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  >
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="rememberUser"
                    class="text-gray-500"
                  >Remember me</label>
                </div>
              </div>
              <!-- <NuxtLink to="/signup" class="text-sm font-medium text-primary hover:underline">Forgot
                password?</NuxtLink> -->
            </div>
            <button
              type="submit"
              :disabled="loading"
              :class="`w-full text-white ${loading ? 'bg-primary-300 cursor-not-allowed' : 'bg-primary hover:bg-primary-700'}  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`"
            >
              Sign
              in
            </button>
            <p class="text-sm font-light text-gray-500">
              Don’t have an account yet?<NuxtLink
                to="/signup"
                class="font-medium text-primary hover:underline"
              >
                Sign up
              </NuxtLink>
            </p>
          </VeeForm>
        </div>
      </div>
    </div>
    <UNotifications />
  </section>
</template>