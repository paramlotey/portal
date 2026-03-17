import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>

        {/* Heading */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        {/* Name */}
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" type="text" placeholder="John Doe" required />
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
          <FieldDescription>
            We'll use this to contact you. We will not share your email with anyone else.
          </FieldDescription>
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" required />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        {/* Confirm Password */}
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input id="confirm-password" type="password" required />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>

        {/* Submit */}
        <Field>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        {/* Social Login */}
        <Field>
          <div className="flex items-center justify-center gap-4">

            {/* Google */}
            <Button
              variant="outline"
              type="button"
              className="flex items-center justify-center gap-2 flex-1"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 533.5 544.3"
              >
                <path
                  fill="#4285F4"
                  d="M533.5 278.4c0-17.7-1.6-34.6-4.6-51H272v96.7h146.9c-6.3 34-25 62.7-53.3 82v68h86.1c50.3-46.3 81.8-114.6 81.8-195.7z"
                />
                <path
                  fill="#34A853"
                  d="M272 544.3c72.6 0 133.5-24.1 178-65.5l-86.1-68c-23.9 16-54.5 25.5-91.9 25.5-70.7 0-130.7-47.7-152.1-111.7H31v70.2c44.5 88.1 135.6 149.5 241 149.5z"
                />
                <path
                  fill="#FBBC04"
                  d="M119.9 324.6c-10.2-30.3-10.2-62.9 0-93.2V161.2H31c-39.1 77.8-39.1 169.9 0 247.7l88.9-84.3z"
                />
                <path
                  fill="#EA4335"
                  d="M272 107.7c39.5-.6 77.4 14.1 106.4 41.1l79.2-79.2C412.7 24.1 351.8 0 272 0 166.6 0 75.5 61.4 31 149.5l88.9 70.2C141.3 155.4 201.3 107.7 272 107.7z"
                />
              </svg>

              Google
            </Button>

            {/* Apple */}
            <Button
              variant="outline"
              type="button"
              className="flex items-center justify-center gap-2 flex-1"
            >
              <svg
                className="h-5 w-5 fill-current"
                viewBox="0 0 384 512"
              >
                <path d="M318.7 268.7c-.2-37.6 16.4-66 50.4-86.7-18.9-27-47.4-41.8-85.2-44.7-35.9-2.8-75.2 21.3-89.6 21.3-15.5 0-51.4-19.6-77.2-19.1C66.7 140.4 0 190.9 0 295.3c0 30.8 5.6 63 16.8 96.5 14.9 44.6 64.8 120.6 116.9 118.7 27.4-.9 46.9-19.5 82.1-19.5 34.2 0 52.2 19.5 82.1 19.5 52.5-.8 99.6-70.6 114.3-114.7-66.5-31.4-93.3-89.3-93.5-127.1zM259.6 72.6c21.8-26.4 19.7-50.3 19-59.6-19.2 1.1-41.4 13.1-55.2 29.4-15.2 17.8-24.1 40.1-22.3 63.4 21.5 1.7 43.7-11 58.5-33.2z"/>
              </svg>

              Apple
            </Button>

          </div>

          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Sign in
            </a>
          </FieldDescription>

        </Field>
      </FieldGroup>
    </form>
  )
}