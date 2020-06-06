import { useState, useEffect } from "react";

export function encode(text: string): string {
  return encodeURIComponent(text);
}

export function getParam(name: string, urlParams): string {
  const searchParams = new URLSearchParams(urlParams);
  return decodeURIComponent(searchParams.get(name) || "");
}

export function setParam(name: string, value: string, urlParams) {
  const searchParams = new URLSearchParams(urlParams);
  searchParams.set(name, encode(value));
  window.history.replaceState(null, null, "?" + searchParams.toString());
}

// hook for storing state in URL so links can be shared
export const useURLState = (name: string): [string, (item: string) => void] => {
  const [param, setParamValue] = useState("");
  const setParamState = (newValue) => {
    setParamValue(newValue);
    setParam(name, newValue, window.location.search);
  };
  useEffect(() => {
    const currentParamValue = getParam(name, window.location.search);
    setParamValue(currentParamValue);
  }, []);
  return [param, setParamState];
};

export function createURLParamString(to, subject, body) {
  const searchParams = new URLSearchParams();

  searchParams.set("to", encode(to));
  searchParams.set("subject", encode(subject));
  searchParams.set("body", encode(body));

  return "?" + searchParams.toString();
}

export function createMailToLink(to, subject, body) {
  const enTo = encode(to);
  const enSubject = encode(subject);
  const enBody = encode(body);

  return `mailto:${enTo}?subject=${enSubject}&body=${enBody}`;
}

export async function getShortenedUrl(url) {
  // fetch no longer needs to be imported from isomorphic-unfetch
  // const res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`, {

  // const res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`, {
  //   method: "POST",
  //   mode: "no-cors",
  // });

  const res = await fetch(`/api/shorten`, {
    method: "POST",
    body: JSON.stringify({ url }),
  });
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  console.log(data);
  return data;
}
