export const ORDER_PHONE = "+44000000";
export const ORDER_PHONE_DISPLAY = "+44000000";
export const INQUIRY_EMAIL = "contact@aquelm.com";
export const CONTACT_EMAIL = "contact@aquelm.com";

export function buildProductInquiryMailto(productTitle, variantLabel) {
  const subject = encodeURIComponent(`Product Inquiry: ${productTitle}`);
  const body = encodeURIComponent(
    `Hello,\n\nI would like to inquire about:\n\nProduct: ${productTitle}\n${variantLabel ? `Size: ${variantLabel}\n` : ""}\nPlease share availability and pricing.\n\nThank you.`
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
    `Hello,\n\nI would like to inquire about:\n\nProduct: ${productTitle}\n${variantLabel ? `Size: ${variantLabel}\n` : ""}\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nCountry: ${country}\n\nPlease share availability and pricing.\n\nThank you.`
  );
  return `mailto:${INQUIRY_EMAIL}?subject=${subject}&body=${body}`;
}
