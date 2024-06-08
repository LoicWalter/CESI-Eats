import { Cookies } from '@repo/ui';
import { cookies } from 'next/headers';

export interface FormError {
  error: string;
}

const getHeaders = () => {
  const authCookie = cookies().get(Cookies.Authentication);
  return { Cookie: `${Cookies.Authentication}=${authCookie?.value}` };
};

export const post = async (url: string, formData: FormData, returnRawResponse = false) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getHeaders() },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  if (returnRawResponse) {
    return res;
  }
  const parsedRes = (await res.json()) as any;
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: '' };
};

export const get = async (url: string) => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...getHeaders() },
  });
  const parsedRes = await res.json();
  console.log(parsedRes);
  return parsedRes;
};

export const getErrorMessage = (response: any) => {
  if (response.message) {
    if (Array.isArray(response.message)) {
      return formatErrorMessage(response.message[0]);
    }
    return formatErrorMessage(response.message);
  }
  return 'Unknown error occured.';
};

const formatErrorMessage = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};
