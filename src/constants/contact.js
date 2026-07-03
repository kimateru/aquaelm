export const ORDER_PHONE = "+18005551234";
export const ORDER_PHONE_DISPLAY = "+1 (800) 555-1234";
export const INQUIRY_EMAIL = "hello@aquaelm.com";

export function buildProductInquiryMailto(productTitle, variantLabel) {
  const subject = encodeURIComponent(`Product Inquiry: ${productTitle}`);
  const body = encodeURIComponent(
    `Hello Aquaelm,\n\nI would like to inquire about:\n\nProduct: ${productTitle}\n${variantLabel ? `Size: ${variantLabel}\n` : ""}\nPlease share availability and pricing.\n\nThank you.`
  );
  return `mailto:${INQUIRY_EMAIL}?subject=${subject}&body=${body}`;
}

export function buildProductInquiryMailtoFromForm({
  name,
  phone,
  email,
  country,
  productTitle,
  variantLabel,
}) {
  const subject = encodeURIComponent(`Product Inquiry: ${productTitle}`);
  const body = encodeURIComponent(
    `Hello Aquaelm,\n\nI would like to inquire about:\n\nProduct: ${productTitle}\n${variantLabel ? `Size: ${variantLabel}\n` : ""}\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nCountry: ${country}\n\nPlease share availability and pricing.\n\nThank you.`
  );
  return `mailto:${INQUIRY_EMAIL}?subject=${subject}&body=${body}`;
}
