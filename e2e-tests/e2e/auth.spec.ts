import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("benjamin6@gmail.com");
  await page.locator("[name=password]").fill("123123");

  await page.getByRole("button", { name: "Signin" }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 201) + 1}@gmail.com`

  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign in" }).click();
  await page.getByRole("link", { name: "Signup" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("benjamin");
  await page.locator("[name=lastName]").fill("nguyen");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123123");
  await page.locator("[name=confirmPassword]").fill("123123");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
